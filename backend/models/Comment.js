module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        commentPictureId: {
            type: Sequelize.STRING(200),
        },
        comment: {
            type: Sequelize.TEXT,
        },
        commentUserId: {
            type: Sequelize.STRING(200),
        },
        commentDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        commentAvatarText: {
            type: Sequelize.STRING(10),
        }
    }, {
        timestamps: false
    });

    return Comment;
};