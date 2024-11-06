const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                console.log("Utilisateur non trouvé");
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log("Mot de passe incorrect");
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }

                    const token = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET', 
                        { expiresIn: '24h' }
                    );

                    
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                })
                .catch(error => {
                    console.error("Erreur lors de la comparaison des mots de passe:", error);
                    res.status(500).json({ error });
                });
        })
        .catch(error => {
            console.error("Erreur lors de la recherche de l'utilisateur:", error);
            res.status(500).json({ error });
        });
};