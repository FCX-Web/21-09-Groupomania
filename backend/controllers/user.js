const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require("password-validator");
const cryptojs = require("crypto-js");
const db = require("../models");
const User = db.user;
const Picture = db.pictures;
const Comment = db.comments;

const { user } = require('../models');
const { exit } = require('process');
const { parse } = require('path');

const schema = new passwordValidator();
schema
    .is().min(8) // minimum 8 caractères
    .is().max(20) // maximum 20 caractères
    .has().uppercase() // doit avoir des majuscules
    .has().lowercase() // doit avoir des minuscules
    .has().digits() // doit avoir des chiffres
    .has().not().spaces(); // ne doit pas avoir d'espace

const checkSpecialChar = /^-|[&#{([|\@)\]}+£$%*?,.;/!]/;

exports.signup = async(req, res, next) => {
    const encryptedFirstName = cryptojs.AES.encrypt(req.body.firstName, process.env.secureEmail).toString();
    const encryptedLastName = cryptojs.AES.encrypt(req.body.lastName, process.env.secureEmail).toString();
    let hash = null;
    const pwd = req.body.password;
    const encryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.secureEmail).toString();

    if (!schema.validate(pwd) && !pwd.match(checkSpecialChar)) {
        console.log("USER / signup / erreur format password !");
        return res.status(500).json({ error: 'USER / signup / erreur format password !' });
    }

    try {
        hash = await bcrypt.hash(pwd, 10);
    } catch (error) {
        console.log('USER / signup / erreur pendant le process de création !');
        return res.status(500).json({ error: 'USER / signup / erreur pendant le process de création !' });
    }

    const user = {
        firstName: encryptedFirstName,
        lastName: encryptedLastName,
        email: encryptedEmail,
        password: hash,
        status: 1,
        likes: 0,
        comments: 0,
        posts: 0
    };

    User.create(user)
        .then(user => {
            console.log('USER/signup/ Utilisateur créé !');
            res.status(200).json({
                token: jwt.sign({ userId: user.id },
                    process.env.tokenDev, { expiresIn: '18h' }
                ),
                firstName: cryptojs.AES.decrypt(user.firstName, process.env.secureEmail).toString(cryptojs.enc.Utf8),
                lastName: cryptojs.AES.decrypt(user.lastName, process.env.secureEmail).toString(cryptojs.enc.Utf8),
                status: user.status,
                likes: user.likes,
                comments: user.comments,
                posts: user.posts,
                userId: user.id
            });
            console.log("TEST", user.id);
        })
        .catch(error => {
            console.log('USER/signup/ erreur lors de la création !');
            return res.status(400).json({ error: 'USER/signup/ erreur lors de la création !' });
        });
};

exports.signin = (req, res, next) => {
    const encryptedEmail = cryptojs.HmacSHA256(req.body.email, process.env.secureEmail).toString();

    User.findOne({ where: { email: encryptedEmail } })
        .then(user => {
            if (!user) {
                console.log('USER/signin/ Utilisateur non trouvé !');
                return res.status(401).json({ error: 'USER/signin/ Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log('USER/signin/ Mot de passe incorrect !');
                        return res.status(401).json({ error: 'USER/signin/ Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        token: jwt.sign({ userId: user.id },
                            process.env.tokenDev, { expiresIn: '18h' }
                        ),
                        firstName: cryptojs.AES.decrypt(user.firstName, process.env.secureEmail).toString(cryptojs.enc.Utf8),
                        lastName: cryptojs.AES.decrypt(user.lastName, process.env.secureEmail).toString(cryptojs.enc.Utf8),
                        status: user.status,
                        likes: user.likes,
                        comments: user.comments,
                        posts: user.posts,
                        userId: user.id
                    });
                    console.log('USER/signin/ Connexion réussie !');
                })
                .catch(() => {
                    console.log('USER/signin/ erreur lors de l\'authentification');
                    res.status(500).json({ error: 'USER/signin/ erreur lors de l\'authentification' });
                });
        })
        .catch(() => {
            console.log('USER/signin/ erreur pendant le process d\'authentification !');
            res.status(500).json({ error: 'USER/signin/ erreur pendant le process d\'authentification !' });
        });
};

exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(allUsers => {
            let users = [];
            for (let user of allUsers) {
                user = {
                    firstName: cryptojs.AES.decrypt(user.firstName, process.env.secureEmail).toString(cryptojs.enc.Utf8),
                    lastName: cryptojs.AES.decrypt(user.lastName, process.env.secureEmail).toString(cryptojs.enc.Utf8),
                    status: user.status,
                    likes: user.likes,
                    comments: user.comments,
                    posts: user.posts,
                    userId: user.id
                };
                if (user.status != 0) {
                    users.push(user)
                };
            };
            res.status(200).json(users);
        })
        .catch(() => {
            console.log('USER/getAllUsers/ erreur pendant le chargement des users !');
            res.status(404).json({ error: 'USER/getAllUsers/ erreur pendant le chargement des users !' });
        });
};

exports.deleteUser = (req, res, next) => {
    console.log("deleteUser");
    User.findOne({ where: { id: req.body.userId } })
        .then(() => {
            User.destroy({ where: { id: req.body.userId } })
                .then(() => {
                    res.status(200).json({ message: 'USER/deleteUser/ user supprimé !' });
                    console.log('USER/deleteUser/ user supprimé !');
                })
                .catch(error => {
                    res.status(400).json({ error });
                    console.log('USER/deleteUser/ erreur lors de la suppression !');
                });
        })
        .catch(error => {
            res.status(500).json({ error });
            console.log('USER/deleteUser/ erreur pendant le process de suppression !');
        });
};

exports.modifyUser = (req, res, next) => {
    if (req.body.incLikes) {
        User.findByPk(req.params.id)
            .then(user => {
                user.increment([likes], { by: 1 });
                console.log('USER/modifyUser/ Compteur likes incrémenté !');
                res.status(200).json({ message: 'USER/modifyUser/ Compteur likes incrémenté !' });
            })
            .catch(error => {
                console.log('USER/modifyUser/ erreur incrémentation compteur likes !');
                res.status(400).json({ error: 'USER/modifyUser/ erreur incrémentation compteur likes !' });
            });
    } else {
        User.findOne({ where: { id: req.params.id } })
            .then(user => {
                const userObject = req.file ? {
                    ...JSON.parse(req.body.content)
                } : {...req.body };
                User.update({...userObject }, { where: { id: req.params.id } })
                    .then(() => {
                        console.log('user modifié !');
                        res.status(200).json({ message: 'user modifié !' });
                    })
                    .catch(() => {
                        console.log('erreur lors de la modification !');
                        res.status(400).json({ error: 'erreur lors de la modification !' });
                    });
            })
            .catch(error => {
                console.log('USER/modifyUser/ Echec de la modification de l\'utilisateur !');
                return res.status(401).json({ error: 'USER/modifyUser/ Echec de la modification de l\'utilisateur !' });
            });
    }
};