module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
        likedPictureId: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        likedUserId: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        likedTag: {
            type: Sequelize.INTEGER,
        }
    }, {
        timestamps: false
    });

    return Like;
};