const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("En-têtes reçus dans la requête :", req.headers);

    const authHeader = req.headers.authorization;
    console.log("Authorization Header reçu :", authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: 'En-tête Authorization manquant' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        req.auth = { userId: decodedToken.userId };
        console.log("Utilisateur authentifié avec ID :", decodedToken.userId);
        next();
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};