# Klint

Un jeu réflexif sur le genre du western

## Commandes

### Dialogues :
- **Espace** : faire défiler les dialogues
- **Flèches haut et bas** : séléctionner une réponse
- **Enter** : valider la réponse / rejouer

### Duels :
- **Maj** : diminuer la jauge
- **Espace** : augmenter la jauge

## Description et mécaniques de jeu

KLint est un jeu 2D développé avec *Kaplay*. Le joueur incarne Klint un cowboy à la recherche d'un criminel prénommé Bad Bill. En chemin, il croise une série d'opposants qui pousseront à l'affrontement. Chaque face à face se déroule en deux temps :

**Phase de dialogue** — Avant chaque duel, une conversation s'engage avec l'adversaire. Le joueur fait des choix de répliques qui influencent l'état émotionnel de Klint (calme ou en colère) et modifient les paramètres du duel à venir.

**Phase de duel** — Une barre de tension dynamique apparaît. Le joueur doit maintenir la jauge dans la zone verte pour désamorcer le combat. L'adversaire envoie des pics de pression aléatoires. Si la tension reste trop longtemps dans le rouge, Klint tire instinctivement. Si trop de temps s'écoule sans résolution, l'ennemi fini par dégainer le premier.

Les issues du duel (désarmement, tir contrôlé, défaite) incrémentent un compteur de coups de feu qui se répercute sur la fin de l'histoire.

## Aperçu




## Installation & lancement

### Jouer en ligne

**Itch.io** : https://toucan-furtif.itch.io/klint

### Lancer le projet en local

```bash
# Cloner le dépôt
git clone https://github.com/[votre-username]/[nom-du-repo].git
cd [nom-du-repo]

# Lancer le serveur de développement
npm run dev
```

Ouvrir ensuite [http://localhost:5173](http://localhost:5173) dans le navigateur (ou le port indiqué dans le terminal).

> **Plein écran** : appuyer sur `P` en jeu pour passer en mode plein écran.


## Moteur et modules

- **Kaplay** : (https://kaplayjs.com/), V3001.0.19 
- **kaplay-loquace** : (https://github.com/loiccattani/kaplay-loquace.git)

## Crédits, licences & sources

### Assets graphiques



### Assets audio




## Recours aux LLM

**Modèles utilisés** : Claude Sonnet 4.5 et Gemini 3.5 Flash

### Cas d'utilisation
- **Implémentation d'une fonction choix dans kaplay-loquace.js** : Claude a généré une fonction affichant un panneau au bas de l'écran et permettant au joueur de faire un choix de réponse. 
- **Aide à la logigue** : Gemini a été utilisé pour trouver et comprendre la logique se cachant derrières certaines mécaniques, sans pour autant les avoir générées entièrement. C'est le cas pour le drift de la barre de tension, la fonction fondusonore ou encore le vecteur de bordure de texte du titre.
- **Relecture orthographique** : Utilisation de Claude pour corriger l'orthographe du fichier dialogues.js.

## Contexte de développement

Ce projet a été développé dans le cadre du cours Jeu vidéo 2D dispensé par Loïc Cattani (SLI, Lettres, UNIL).
