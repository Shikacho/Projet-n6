const Book = require('../models/Book');


exports.createBook = (req, res, next)=> {
    delete req.body.id;
    const book = new Book({
      ...req.body
    });
    book.save()
    .then(() => res.status(201).json({message: 'Livre Ajouté !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyBook = (req, res, next) => {
    Book.updateOne({id: req.params.id}, {...req.body, id:req.params.id}) 
      .then(() => res.status(200).json({ message:'Livre ajouté !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteBook =  (req, res, next) => {
    Book.deleteOne({id: req.params.id })
    .then(() => res.status(200).json({ message:'Livre supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next)=> {
    Book.findOne({id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllBook = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

