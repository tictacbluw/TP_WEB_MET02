# Procédure d'installation :

## Backend :
 prérequis : un serveur lamp (php 7+, mysql, composer, apache2)
 
 - placer le contenu du fichier `backend` à la racine du dossier /var/www ou équivalent selon votre configuration apache.
 
 - dans un terminal pointant dans le dossier var/www lancer la commande `composer install`.

- importer la base de données `test.sql`.

- éditer le fichier config.php avec les informations de connection au serveur mysql.

- si l'installation s'est bien déroulé `http://localhost/` devrait afficher le message suivant :
API IS RUNNING...
2020-01-29 13:58:42

documentation de l'api disponible dans le dossier apidoc.

account client de test :
email : test@test.com
mot de passe : mdp

## Frontend 
 prérequis : nmp et angular-cli d'installés.
 
 - créer une application angular `ng new frontend`.
 
 - placer le contenu du dossier `frontend` dans le dossier nouvellement crée
 
 - dans un terminal pointant dans le dossier frontend lancer la commande "nmp install".

-lancer le front avec la commande "ng serve".

account client de test :
email : test@test.com
mot de passe : mdp
