const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/books');

mongoose.connect('mongodb+srv://Shikacho:Shotlouf17@cluster0.efv9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', error));

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
    
module.exports = app;
