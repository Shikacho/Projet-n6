const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const Book = require('./models/Book');

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

  app.post('/api/books', (req, res, next)=> {
    delete req.body.id;
    const book = new Book({
      ...req.body
    });
    book.save()
    .then(() => res.status(201).json({message: 'Livre Ajouté !'}))
    .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/books/:id', (req, res, next)=> {
    Book.findOne({id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/books', (req, res, next) => {
      Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
    });
    
    module.exports = app;
