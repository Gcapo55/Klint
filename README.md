# Klint

*Un jeu réflexif sur le genre du western.*

## Description et mécaniques de jeu

KLint est un jeu 2D développé avec *Kaplay*. Le joueur incarne Klint un cowboy à la recherche d'un criminel prénommé Bad Bill. En chemin, il croise une série d'opposants qui le poussent à l'affrontement. Chaque face à face se déroule en deux temps :

**Phase de dialogue** : Avant chaque duel, une conversation s'engage avec l'adversaire. Le joueur fait des choix de répliques qui influencent l'état émotionnel de Klint (calme ou en colère) et modifient les paramètres du duel à venir.

**Phase de duel** : Une barre de tension dynamique apparaît. Le joueur doit maintenir la jauge dans la zone verte pour désamorcer le combat. L'adversaire envoie des pics de pression aléatoires qui font bondir la jauge. Si la tension reste trop longtemps dans le rouge, Klint tire instinctivement. Si trop de temps s'écoule sans résolution, l'ennemi fini par dégainer le premier.

Les issues du duel (désarmement, tir contrôlé, défaite) incrémentent un compteur de coups de feu qui définit l'une des deux fins.

## Commandes

#### Dialogues :
- **Espace** : faire défiler les dialogues
- **Flèches haut et bas** : sélectionner une réponse
- **Enter** : valider la réponse / rejouer

#### Duels :
- **X** : diminuer la jauge
- **Espace** : augmenter la jauge

## Aperçu

<div align="center">
  <img src="assets/readme/Capture d’écran (1).png" alt="Capture duel 1" width="700">
</div>

<div align="center">
  <img src="assets/readme/Capture d’écran (4).png" alt="Capture duel 2" width="700">
</div>

<div align="center">
  <img src="assets/readme/Capture d’écran (3).png" alt="Capture duel 3" width="700">
</div>

## Installation & lancement

#### Jouer en ligne

**Itch.io** : https://toucan-furtif.itch.io/klint

#### Lancer le projet en local avec Node.js

```bash
# Cloner le dépôt
git clone https://github.com/Gcapo55/Klint.git
cd Klint

# 2. Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

**Plein écran** : appuyer sur `P` en jeu pour passer en mode plein écran.

Il est fortement recommendé de jouer en plein écran avec le son !

## Moteur et modules

- **Kaplay** : https://kaplayjs.com/, V3001.0.19
- **kaplay-loquace** : https://github.com/loiccattani/kaplay-loquace.git

## Crédits

Tous les assets qui ne sont pas mentionnés dans les listes ci-dessous ont été réalisés par mes soins. Ils sont libres de droit. 

#### Assets graphiques
- **Tuile sable** : https://opengameart.org/content/sand-desert-dune-tile
- **Vautour** : https://elthen.itch.io/2d-pixel-art-vulture-sprites
- **Corbeau** : https://elthen.itch.io/2d-pixel-art-raven-sprites

#### Assets audios
- **Musique duel 1** : https://mummychicken3.itch.io/an-old-town-of-dust/
- **Musique duel 2 et fin** : https://pixabay.com/music/mystery-western-cowboy-duel-background-350113/
- **Musique duel 3** : https://thegoldocelot.itch.io/americana/
- **Musique écran de victoire** : https://pixabay.com/music/upbeat-spaghetti-western-491538/
- **Stand-off** : https://pixabay.com/sound-effects/western-stand-off-474218/
- **Son défaite** : https://pixabay.com/sound-effects/western-sting-electric-guitar-474221/

- **Vent** : https://pixabay.com/sound-effects/nature-wind-western-64661/
- **Coloeus monedula** : https://pixabay.com/sound-effects/nature-western-jackdaw-coloeus-monedula-37560/
- **Pies** : https://pixabay.com/sound-effects/nature-magpie-western-27116/
- **Chien** : https://pixabay.com/sound-effects/nature-distant-dog-barking-472373/
- **Serpent** : https://pixabay.com/sound-effects/nature-snake-hissing-6092/
- **Souris** : https://pixabay.com/sound-effects/nature-mouse-animal-sound-367490/

- **Holster** : https://pixabay.com/sound-effects/film-special-effects-holster-pistol-7132/
- **Coup de feu** : https://pixabay.com/sound-effects/film-special-effects-pistol-riccochet-7046/
- **Rage Klint** : https://pixabay.com/fr/sound-effects/gens-angry-scream-104974/
- **Grognement Badbill** : https://pixabay.com/fr/sound-effects/gens-angry-grunt-103204/
- **Rage Badbill** : https://www.youtube.com/watch?v=9A8KRRwLPac
- **Son Ramon** : https://uppbeat.io/sfx/western-stand-off-acoustic-guitar-strum/1972/16918
- **Crachat** : https://pixabay.com/sound-effects/people-spit-437708/

## Recours aux LLM

**Modèles utilisés** : Claude Sonnet 4.5 et Gemini 3.5 Flash

### Cas d'utilisation
- **Implémentation d'une fonction choix dans kaplay-loquace.js** : Dans le fichier, kaplay-loquace.js, Claude a généré une fonction affichant un panneau au bas de l'écran et permettant au joueur de faire un choix de réponse. 
- **Aide à la logigue du code** : Gemini a été utilisé pour trouver et comprendre la logique se cachant derrières certaines mécaniques, sans pour autant les avoir générées entièrement. C'est le cas pour le drift de la barre de tension, la fonction fondusonore ou encore le vecteur de bordure de texte du titre.
- **Relecture orthographique** : Utilisation de Claude pour corriger l'orthographe du fichier dialogues.js.

## Contexte de développement

Ce projet a été développé dans le cadre du cours Jeu vidéo 2D dispensé par Loïc Cattani (SLI, Lettres, UNIL).
