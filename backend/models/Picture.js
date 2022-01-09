module.exports = (sequelize, Sequelize) => {
    const Picture = sequelize.define("picture", {
        imageUrl: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(200),
            unique: 'uniqueIndex',
            allowNull: false
        },
        userId: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        avatarText: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        comments: {
            type: Sequelize.INTEGER,
        },
        likes: {
            type: Sequelize.INTEGER,
        },
        likeStatus: {
            type: Sequelize.STRING(10),
        },
        usersLiked: {
            type: Sequelize.STRING(10),
        },
    }, {
        timestamps: false
    });

    return Picture;
};