const db = require("../models");
const User = db.user;
const Picture = db.pictures;
const Comment = db.comments;

const { exit } = require('process');

exports.createComment = (req, res, next) => {
    const comment = {
        commentPictureId: req.body.commentPictureId,
        comment: req.body.comment,
        commentUserId: req.body.commentUserId,
        commentAvatarText: req.body.commentAvatarText,
        commentDate: Date.now()
    };
    Comment.create(comment)
        .then(comment => {
            console.log('COMMENTS/createComment/ commentaire enregistré !');
            res.status(201).json({ message: 'COMMENTS/createComment/ commentaire enregistré !' });
        })
        .catch(error => {
            console.log('COMMENTS/createComment/ erreur lors de l\'enregistrement !');
            res.status(400).json({ error: 'COMMENTS/createComment/ erreur lors de l\'enregistrement !' });
        });
};

exports.deleteComment = (req, res, next) => {
    console.log(req.params.id);
    User.findOne({ where: { id: req.params.userId } })
        .then(user => {
            if (user.id == req.params.userId || user.status == 0) {
                console.log("COMMENTS/deleteComment/ Vous êtes autorisés à supprimer ce commentaire !");
                Comment.findOne({ where: { id: req.params.id } })
                    .then(comment => {
                        Comment.destroy({ where: { id: req.params.id } })
                            .then(() => {
                                console.log('COMMENTS/deleteComment/ commentaire supprimé !');
                                res.status(200).json({ message: 'COMMENTS/deleteComment/ commentaire supprimé !' });
                            })
                            .catch(() => {
                                console.log('COMMENTS/deleteComment/ erreur lors de la suppression !');
                                res.status(400).json({ error: 'COMMENTS/deleteComment/ erreur lors de la suppression !' });
                            });
                    })
                    .catch(() => {
                        console.log('COMMENTS/deleteComment/ erreur pendant le process de suppression !');
                        res.status(500).json({ error: 'COMMENTS/deleteComment/ erreur pendant le process de suppression !' });
                    });
            } else {
                console.log("COMMENTS/deleteComment/ Vous n'êtes pas autorisé à supprimer ce commentaire !");
            }
        })
        .catch(() => {
            console.log("COMMENTS/deleteComment/ Utilisateur non trouvé !");
        });
};

exports.deleteManyCommentsOnePicture = (req, res, next) => {
    User.findOne({ where: { id: req.params.userId }  })
        .then(user => {
            if (user.id == req.params.userId || user.status == 0) {
                console.log("COMMENTS/deleteManyComments/ Vous êtes autorisés à supprimer ces commentaires !");
                Comment.destroy({ where: { commentUserId: req.params.userId, commentPictureId: req.params.id } })
                    .then(() => {
                        console.log('COMMENTS/deleteManyComments/ commentaires supprimés !');
                        res.status(200).json({ message: 'COMMENTS/deleteManyComments/ commentaires supprimés !' });
                    })
                    .catch(() => {
                        console.log('COMMENTS/deleteManyComments/ erreur lors de la suppression !');
                        res.status(400).json({ error: 'COMMENTS/deleteManyComments/ erreur lors de la suppression !' });
                    });
            } else {
                console.log("COMMENTS/deleteManyComments/ Vous n'êtes pas autorisé à supprimer ces commentaires !");
            }
        })
        .catch(() => {
            console.log("COMMENTS/deleteManyComments/ Utilisateur non trouvé !");
        });
};

exports.deleteManyComments = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }  })
        .then(user => {
            if (user.id == req.params.id || user.status == 0) {
                console.log("COMMENTS/deleteManyComments/ Vous êtes autorisés à supprimer ces commentaires !");
                Comment.destroy({ where: { commentUserId: req.params.id } })
                    .then(() => {
                        console.log('COMMENTS/deleteManyComments/ commentaires supprimés !');
                        res.status(200).json({ message: 'COMMENTS/deleteManyComments/ commentaires supprimés !' });
                    })
                    .catch(() => {
                        console.log('COMMENTS/deleteManyComments/ erreur lors de la suppression !');
                        res.status(400).json({ error: 'COMMENTS/deleteManyComments/ erreur lors de la suppression !' });
                    });
            } else {
                console.log("COMMENTS/deleteManyComments/ Vous n'êtes pas autorisé à supprimer ces commentaires !");
            }
        })
        .catch(() => {
            console.log("COMMENTS/deleteManyComments/ Utilisateur non trouvé !");
        });
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll()
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(() => {
            console.log('COMMENTS/getAllComments/ erreur pendant le chargement des commentaires !');
            res.status(404).json({ error: 'COMMENTS/getAllComments/ erreur pendant le chargement des commentaires !' });
        });
};