import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";
import { loquacePlugin } from "./kaplay-loquace.js";
import { homeScene } from "./scenes/home.js";
import { duel1 } from "./scenes/duel1.js";
import { duel2 } from "./scenes/duel2.js";
import { dialogues } from "./dialogues.js";
import { myTiles } from "./tiledefinition.js";

kaplay(
  {
    plugins: [loquacePlugin],
  }
);

loadSprite("fleche","assets/fleche.png")

loquace.init({
});
loquace.script(dialogues)


loadSprite("homebg", "assets/backgrounds/menubg2.png");
loadSprite('poteau', 'assets/affiches/badbillpoteau.png');

loadSprite('tile0', 'assets/Floor/tile0.png');
loadSprite('tile0.5', 'assets/Floor/tile0.5.png');
loadSprite('tile1', 'assets/Floor/tile1.png');
loadSprite('tile2', 'assets/Floor/tile2.png');
loadSprite('tile3', 'assets/Floor/tile3.png');
loadSprite('tile4', 'assets/Floor/tile4.png');
loadSprite('tile5', 'assets/Floor/tile5.png');
loadSprite('tile6', 'assets/Floor/tile6.png');

loadSprite('klint', 'assets/cowboy/klint.png',{
  sliceX: 6,
  sliceY: 4,
    anims: {
      idle: {
        from: 0,
        to: 0,
      },
      focus: {
          from: 1,
          to: 1,
      },
      shooting: {
        from: 2,
        to: 13,
        speed: 6,
      },
      relax: {
        from: 14,
        to: 15,
        loop: true,
        speed: 3,
      },
      affraid: {
        from: 16,
        to: 23,
        speed: 2,
      }
    },
});

loadSprite("klintvener", "assets/cowboy/klintvener.png", {
  sliceX: 9,
  sliceY: 6,
    anims: {
      idle: {
        from: 40,
        to: 41,
        loop: true,
        speed: 3,
      },
      focus: {
          from: 1,
          to: 1,
      },
      shooting: {
        from: 2,
        to: 13,
        speed: 6,
      },
      relax: {
        from: 14,
        to: 31,
        loop: true,
        speed: 9,
      },
      rage: {
        from: 42,
        to: 51,
        loop: true,
        speed: 4,
      },
      affraid: {
        from: 32,
        to: 39,
        speed: 3,
      },
    },
});
loadSprite("calamity", "assets/cowboy/Calamity.png", {
  sliceX: 5,
  sliceY: 3,
  anims: {
    idle: {
      from: 0,
      to: 0, 
    },
    focus: {
      from: 1,
      to: 1,
    },
    shooting: {
      from: 6,
      to: 10,
      speed: 3,
    }
  },
});

loadSprite("birds", "assets/birds/birds.png", {
  sliceX: 1,
  sliceY: 3,
  anims: {
    fly: {
      from: 0,
      to: 2,
      loop: true,
      speed: 6, 
    },
  },
});

loadSound('homesound', 'assets/sounds/intro.mp3');

loquace.characters({
  k: {
    name: 'klint',
    dialogType: 'pop',
    position: 'center',
    dialogOptions: {
      position: 'topleft',
      doTween: true,
      showNextPrompt: false,
      dialogText: {
        color: BLACK,
      },
    },
  },
  e: {
    name: 'ennemi',
    dialogType: 'pop',
    position: 'center',
    dialogOptions: {
      position: 'topright',
      doTween: true,
      showNextPrompt: false,
      dialogText: {
        color: BLACK,
      },
    },
  },
  n: {
      name: 'narrateur',
      dialogType: 'vn',
      position: 'center',
      dialogOptions: {
          doTween: true,
          showNextPrompt: false,
          dialogText: {
              color: BLACK,
          },
      },
  },
});

homeScene();
duel1(myTiles);
duel2(myTiles);

go("duel1");