import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";
import { loquacePlugin } from "./kaplay-loquace.js";
import { homeScene } from "./scenes/home.js";
import { duel1 } from "./scenes/duel1.js";
import { duel2 } from "./scenes/duel2.js";
import { perdu } from "./scenes/perdu.js";
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
      shoot: {
        from: 2,
        to: 13,
        speed: 4,
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
      shoot: {
        from: 2,
        to: 13,
        speed: 4,
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
    shoot: {
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

// Sons
loadSound('homesound', 'assets/sounds/intro.mp3');
loadSound('angry', "assets/sounds/angry.mp3");
loadSound('holster', "assets/sounds/holster.mp3");
loadSound('gunshot', "assets/sounds/gunshot.mp3");

loadSound('vent', "assets/sounds/wind.mp3");
loadSound('bird', "assets/sounds/bird1.mp3");
loadSound('animal', "assets/sounds/animal.mp3");
loadSound('mouse', "assets/sounds/mouse.mp3");
loadSound('snake', "assets/sounds/snake.mp3");
loadSound('dog', "assets/sounds/dog.mp3");

loadSound('mainmusic', "assets/sounds/musics/main.mp3");

loquace.characters({
  k: {
    name: 'klint',
    dialogType: 'pop',
    position: 'center',
    dialogOptions: {
      position: 'topleft',
      doTween: true,
      showNextPrompt: false,
      textBox: {
        width: 600,
      },
      dialogText: {
        color: BLACK,
        options: {
          width: 550,
          align: "center",
        },
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
      textBox: {
        width: 600,
      },
      dialogText: {
        color: BLACK,
        options: {
          width: 550,
          align: "center",
        },
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
            options: {
              align: "center",
            },
        },
      },
  },
});

let shotmeter = 0;

// fonction pour arrêter la musique 
const fondusonore = (music, duration = 2) => {
    const startVolume = music.volume;
    const interval = 0.05; // baisse le son toutes les 50ms
    const step = startVolume / (duration / interval);

    const fade = setInterval(() => {
        if (music.volume > 0) {
            music.volume -= step;
        } else {
            music.stop();
            clearInterval(fade);
        }
    }, interval * 1000);
};

// créer l'ambiance sonore en background des dialogues
let touslessons = [];
let animalTimer = null; // Pour stocker le wait en cours

function ambiancesonore() {
    stoptout();

    let vent = play("vent", {
        loop: true,
        volume: 0.8,
    });
    touslessons.push(vent);

    function loopAnimals() {
        // On stocke le timer dans une variable
        animalTimer = wait(rand(15, 25), () => {
            const animals = ["bird", "animal", "dog", "mouse", "snake"];
            let cris = play(choose(animals), {
                volume: 0.2,
                detune: rand(-200, 200),
            });
            touslessons.push(cris);
            loopAnimals(); // Relance la boucle
        });
    }
    
    loopAnimals();
}

// Arrête tous les sons stockés
function stoptout() {
    touslessons.forEach(son => {
        if (son.stop) son.stop();
    });
    touslessons = [];

    // CRUCIAL : On annule le timer en cours pour stopper la boucle infinie
    if (animalTimer) {
        animalTimer.cancel(); 
        animalTimer = null;
    }
}

homeScene();
duel1(myTiles, shotmeter, ambiancesonore, stoptout);
duel2(myTiles, shotmeter, ambiancesonore, stoptout);

perdu();

go("duel1");