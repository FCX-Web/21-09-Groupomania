module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: 'uniqueIndex'
        },
        password: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        likes: {
            type: Sequelize.INTEGER,
        },
        comments: {
            type: Sequelize.INTEGER,
        },
        posts: {
            type: Sequelize.INTEGER,
        },
    }, {
        timestamps: false
    });

    return User;
};