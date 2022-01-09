const db = require("../models");
const User = db.user;
const Picture = db.pictures;
const Like = db.likes;

const fs = require('fs');
const { exit } = require('process');
const { user } = require("../models");

exports.createPicture = (req, res, next) => {
    const pictureObject = JSON.parse(req.body.content);
    const picture = {
        ...pictureObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        date: Date.now(),
        comments: 0,
        likes: 0,
        likeStatus: 0,
        usersLiked: 0
    };

    Picture.create(picture)
        .then(response => {
            console.log('objet enregistré !');
            res.status(201).json({ message: 'objet enregistré !' });
        })
        .catch(error => {
            console.log('erreur lors de l\'enregistrement !');
            res.status(400).json({ error: 'erreur lors de l\'enregistrement !' });
        });
};

exports.modifyPicture = (req, res, next) => {
    const pictureObject = req.file ? {
        ...JSON.parse(req.body.picture)
    } : {...req.body };
    Picture.update({...pictureObject }, { where: { id: req.params.id } })
        .then(picture => {
            console.log('PICTURE/createPicture/ objet modifié !');
            res.status(200).json({ message: 'PICTURE/createPicture/ objet modifié !' });
        })
        .catch(error => {
            console.log('PICTURE/createPicture/ erreur lors de la modification !');
            res.status(400).json({ error: 'PICTURE/createPicture/ erreur lors de la modification !' });
        });
};

exports.deletePicture = (req, res, next) => {
    User.findOne({ where: { id: req.params.userId } })
        .then(user => {
            if (user.id == req.params.userId || user.status == 0) {
                console.log("PICTURE/deletePicture/ Vous êtes autorisés à supprimer ce post !");
                Picture.findOne({ where: { id: req.params.id } })
                    .then(picture => {
                        const filename = picture.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            Picture.destroy({ where: { id: req.params.id } })
                                .then(() => {
                                    console.log('PICTURE/deletePicture/ objet supprimé !');
                                    res.status(200).json({ message: 'PICTURE/deletePicture/ objet supprimé !' });
                                })
                                .catch(() => {
                                    console.log('PICTURE/deletePicture/ erreur lors de la suppression !');
                                    res.status(400).json({ error: 'PICTURE/deletePicture/ erreur lors de la suppression !' });
                                });
                        });
                    })
                    .catch(() => {
                        console.log('PICTURE/deletePicture/ erreur pendant le process de suppression !');
                        res.status(500).json({ error: 'PICTURE/deletePicture/ erreur pendant le process de suppression !' });
                    });
            } else {
                console.log("PICTURE/deletePicture/ Vous n'êtes pas autorisé à supprimer ce post !");
            }
        })
        .catch(() => {
            console.log("PICTURE/deletePicture/ Utilisateur non trouvé !");
        });
};

exports.deleteManyPictures = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            if (user.id == req.params.id || user.status == 0) {
                console.log("PICTURE/deleteManyPicture/ Vous êtes autorisés à supprimer ces posts !");
                Picture.destroy({ where: { userId: req.params.id } })
                    .then(() => {
                        console.log('PICTURE/deleteManyPicture/ objets supprimés !');
                        res.status(200).json({ message: 'PICTURE/deleteManyPicture/ objets supprimés !' });
                    })
                    .catch(() => {
                        console.log('PICTURE/deleteManyPicture/ erreur lors de la suppression !');
                        res.status(400).json({ error: 'PICTURE/deleteManyPicture/ erreur lors de la suppression !' });
                    });
            } else {
                console.log("PICTURE/deleteManyPicture/ Vous n'êtes pas autorisé à supprimer ce post !");
            }
        })
        .catch(() => {
            console.log("PICTURE/deleteManyPicture/ Utilisateur non trouvé !");
        });
};

exports.getOnePicture = (req, res, next) => {
    Picture.findOne({ where: { id: req.params.id } })
        .then(picture => {
            console.log('PICTURE/getOnePicture/ image chargée !');
            res.status(200).json(picture);
        })
        .catch(() => {
            console.log('PICTURE/getOnePicture/ erreur pendant le chargement de l\'image !');
            res.status(404).json({ error: 'PICTURE/getOnePicture/ erreur pendant le chargement de l\'image !' });
        });
};

exports.getAllPictures = (req, res, next) => {
    Picture.findAll()
        .then(pictures => {
            console.log('PICTURE/getAllPicture/ images chargées !');
            res.status(200).send(pictures);
        })
        .catch(() => {
            console.log('PICTURE/getAllPicture/ erreur pendant le chargement des images !');
            res.status(404).json({ error: 'PICTURE/getAllPicture/ erreur pendant le chargement des images !' });
        });
};

exports.feedbackPicture = (req, res, next) => {
    const pictureId = req.params.id;
    const pictureUserId = req.body.pictureUserId;
    const userId = req.body.userId;

    console.log(pictureId, pictureUserId, userId);

    Like.findOne({ where: {  LikedPictureId: pictureId, LikedUserId: userId } })
        .then(like => {
            if (like) {
                Like.destroy({ where: {  LikedPictureId: pictureId, LikedUserId: userId } })
                    .then(like => {
                        console.log('PICTURE/feedBackPicture/ Vous aviez déjà donné votre avis ! like annulé !');
                        Like.findAll()
                            .then(likes => {
                                res.status(200).json(likes);
                                Picture.findByPk(pictureId)
                                    .then(picture => {
                                        picture.decrement('likes');
                                        User.findByPk(pictureUserId)
                                            .then(user => {
                                                user.decrement('likes');
                                            })
                                            .catch(error => {
                                                console.log(error);
                                            });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            })
                    })
                    .catch(() => {
                        console.log('PICTURE/feedBackPicture/ erreur annulation like !');
                        res.status(400).json({ error: 'PICTURE/feedBackPicture/ erreur annulation like !' });
                    })
            } else {
                Like.create({  likedPictureId: pictureId, likedUserId: userId, likedTag: 1 })
                    .then(like => {
                        console.log('PICTURE/feedBackPicture/ like ajouté !');
                        Like.findAll()
                            .then(likes => {
                                res.status(200).json(likes);
                                Picture.findByPk(pictureId)
                                    .then(picture => {
                                        picture.increment('likes');
                                        User.findByPk(pictureUserId)
                                            .then(user => {
                                                user.increment('likes');
                                            })
                                            .catch(error => {
                                                console.log(error);
                                            });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            })
                    })
                    .catch(() => {
                        console.log('PICTURE/feedBackPicture/ erreur ajout dislike !');
                        res.status(400).json({ error: 'PICTURE/feedBackPicture/ erreur ajout like !' });
                    });
            }
        })
        .catch(() => {
            console.log('PICTURE/feedBackPicture/ erreur lors de la gestion des like/dislike !');
            res.status(400).json({ error: 'PICTURE/feedBackPicture/ erreur lors de la gestion des like/dislike !' });
        });
};