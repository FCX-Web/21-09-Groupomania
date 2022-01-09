const express = require('express'); //https://expressjs.com/fr/
const path = require('path'); //https://nodejs.org/api/path.html
const rateLimit = require("express-rate-limit"); //https://www.npmjs.com/package/express-rate-limit
const helmet = require("helmet"); //https://www.npmjs.com/package/helmet
const nocache = require('nocache'); //https://www.npmjs.com/package/nocache
require('dotenv').config(); //https://www.npmjs.com/package/dotenv

const picturesRoutes = require('./routes/pictures');
const userRoutes = require('./routes/user');
const commentsRoutes = require('./routes/comments');

const app = express();

//limitation nombre de requêtes par sessions
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100 //100 requêtes
});

//Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/pictures', picturesRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comments', commentsRoutes);
app.use(limiter);
app.use(helmet());
app.use(nocache());

module.exports = app;