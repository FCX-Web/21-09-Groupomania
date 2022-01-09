require('dotenv').config();

const Sequelize = require("sequelize");
//PREPARATION ACCES CLIENT BDD
// const sequelize = new Sequelize(`${process.env.DB_BDD}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
const sequelize = new Sequelize('groupomaniadb', 'fcxdevelopment', 'fcx$sequelize', {
    dialect: "mysql",
    host: "localhost",
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection à Sequelize réussie !');
    })
    .catch(err => {
        console.error('Connection à Sequelize échouée !', err);
    });

sequelize.sync();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pictures = require("./Picture.js")(sequelize, Sequelize);
db.user = require("./User.js")(sequelize, Sequelize);
db.comments = require("./Comment.js")(sequelize, Sequelize);
db.likes = require("./Like.js")(sequelize, Sequelize);

module.exports = db;