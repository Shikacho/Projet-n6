Étapes de Configuration


1. Créez un Fichier .env
À la racine du projet, créez un fichier .env contenant les informations suivantes :


MONGO_URI=Votre_chaine_de_connexion_MongoDB
JWT_SECRET=Votre_cle_secrete_pour_les_tokens

MONGO_URI : Remplacez Votre_chaine_de_connexion_MongoDB par votre propre chaîne de connexion MongoDB.
JWT_SECRET : Remplacez Votre_cle_secrete_pour_les_tokens par une clé aléatoire et sécurisée pour signer les tokens JWT.


2. Installez les Dépendances
Exécutez cette commande dans le terminal pour installer les dépendances nécessaires au projet :


npm install


3. Lancez le Serveur
Utilisez la commande suivante pour démarrer le serveur :

npm start
Le serveur sera accessible à l’adresse : http://localhost:4000.

