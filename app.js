const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', error));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;