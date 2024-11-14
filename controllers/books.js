const Book = require('../models/Book');
const fs = require('fs');
const mongoose = require('mongoose'); 

exports.createBook = (req, res, next) => {
    try {
        if (!req.body.book) {
            return res.status(400).json({ error: 'Les données du livre sont manquantes.' });
        }
        const bookObject = JSON.parse(req.body.book);  
        delete bookObject._id;
        delete bookObject._userId;

        if (!bookObject.author) {
            return res.status(400).json({ error: 'Le champ "author" est requis.' });
        }
        const imageUrl = req.file
            ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            : null; 
        const book = new Book({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: imageUrl, 
        });
        book.save()
            .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        console.error("Erreur lors de la création du livre :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Livre modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

exports.getOneBook = (req, res, next)=> {
    Book.findOne({_id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllBook = (req, res, next) => {
    Book.find()
    .then(books => {
        console.log("Livres récupérés :", books); 
        res.status(200).json(books);
    })
    .catch(error => res.status(400).json({ error }));
};


exports.rateBook = async (req, res, next) => {
    try {
        console.log('Requête reçue pour noter un livre.');

  
        console.log('Corps de la requête reçu :', req.body);

        console.log('ID reçu :', req.params.id);
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID invalide.' });
        }

        const grade = parseFloat(req.body.rating);
        console.log('Note reçue (grade) après conversion :', grade);

        if (isNaN(grade) || grade < 0 || grade > 5) {
            return res.status(400).json({ message: 'La note doit être un nombre entre 0 et 5.' });
        }

        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé.' });
        }
        console.log('Livre trouvé :', book.title);

        const existingRating = book.ratings.find(r => r.userId === req.auth.userId);
        if (existingRating) {
            return res.status(403).json({ message: 'Vous avez déjà noté ce livre. Il est impossible de modifier une note.' });
        }

        console.log('Nouvelle évaluation :', { userId: req.auth.userId, grade });
        book.ratings.push({ userId: req.auth.userId, grade });

        const totalGrades = book.ratings.reduce((sum, r) => sum + (r.grade || 0), 0);
        book.averageRating = book.ratings.length > 0 ? totalGrades / book.ratings.length : 0;
        console.log('Nouvelle moyenne calculée :', book.averageRating);

     
        await book.save();
        console.log('Livre mis à jour et sauvegardé.');

        res.status(200).json(book);
    } catch (error) {
        console.error('Erreur lors de la notation du livre :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
};

exports.getBestRatedBooks = async (req, res, next) => {
    try {
        const books = await Book.find()
            .sort({ averageRating: -1 })
            .limit(3);

        res.status(200).json(books); 
    } catch (error) {
        console.error('Erreur lors de la récupération des livres les mieux notés :', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};