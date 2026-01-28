# TP2 Cours sur les cadriciel | Application de gestion de forfait de voyages avec React.

Application web *Single Page Application (SPA)* développée avec **React.js** permettant de gérer des forfaits de voyage (création, affichage, modification et suppression). Les forfaits sont enregistrés dans un fichier json.

Le projet utilise **json-server** comme API locale et **Tailwind CSS** pour le design.

## Technologies utilisées

### Frontend
- React.js
- React Router DOM
- Vite
- Tailwind CSS

### Backend (API locale)
- json-server
- Node.js


## Fonctionnalités

- Affichage de la liste des forfaits
- Ajout d’un nouveau forfait
- Modification d’un forfait existant
- Suppression d’un forfait
- Page détail d’un forfait
- Gestion des catégories
- Ajout de plusieurs images par forfait
- Tri des forfaits par date
- Navigation avec React Router
- Design responsive avec Tailwind

(CRUD complet)

## Structure du projet

/src
/components
/pages
/services
App.jsx
main.jsx

forfaits.json


## Installation 

**Terminal**

1. git clone <url-du-repo>
cd forfaitsvoyage

2. Installer les dépendances
npm install

3. Lancer le serveur json-server
npm run server

API disponible sur :
http://localhost:5000/forfaits

4. Lancer l’application React
npm run dev

Application disponible sur :
http://localhost:5173

API
Les données sont stockées dans :
forfaits.json

Les requêtes utilisent fetch :

GET /forfaits

POST /forfaits

PUT /forfaits/:id

DELETE /forfaits/:id

Les IDs sont générés automatiquement par json-server (UUID string).

Notes
Projet réalisé avec une architecture composants React.

Aucune librairie externe pour les requêtes HTTP (fetch natif).

Images ajoutées via URL. Optimisation des images avec **loading="lazy"**, **decoding="async"**, **crop, q**, etc.

Application pensée comme un système de gestion simple.

# Déploiement sur Netlify

Installé le fichiers forfaits.json dans le dossier public et changer l'url de fetch pour /forfaits.json dans le fichier App.jsx

Ce ne sera pas possible d'ajouter, modifier et supprimer des forfaits. Ce sera Read Only.

Auteure : Chantal Pépin