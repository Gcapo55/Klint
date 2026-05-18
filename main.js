import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";
import { loquacePlugin } from "./kaplay-loquace.js";
import { homeScene } from "./scenes/home.js";
import { duel1 } from "./scenes/duel1.js";
import { duel2 } from "./scenes/duel2.js";
import { duel3 } from "./scenes/duel3.js";
import { arrestation } from "./scenes/arrestation.js";
import { duelfinal } from "./scenes/duelfinal.js";
import { perdu } from "./scenes/perdu.js";
import { dialogues } from "./dialogues.js";
import { myTiles } from "./tiledefinition.js";

kaplay(
  {
    width:1000,
    height:600,
    letterbox: true,
    plugins: [loquacePlugin],
  }
);

loadSprite("fleche","assets/fleche.png")

loquace.init({});
loquace.script(dialogues)


loadSprite("homebg", "assets/backgrounds/menubg2.png");
loadSprite("bgduel1", "assets/backgrounds/bgduel1.png");
loadSprite("bgduel2", "assets/backgrounds/bgduel2.png");
loadSprite("bgduel3", "assets/backgrounds/bgduel3.png");
loadSprite("bgend", "assets/backgrounds/bgend.png");
loadSprite('poteau', 'assets/affiches/badbillpoteau.png');
loadSprite('cactus', 'assets/backgrounds/cactus.PNG');
loadSprite('rock', 'assets/backgrounds/rock.png');
loadSprite('fences', 'assets/backgrounds/poteaux.png');

loadSprite('tile0', 'assets/Floor/tile0.png');
loadSprite('tile0.5', 'assets/Floor/tile0.5.png');
loadSprite('tile1', 'assets/Floor/tile1.png');
loadSprite('tile2', 'assets/Floor/tile2.png');
loadSprite('tile3', 'assets/Floor/tile3.png');
loadSprite('tile4', 'assets/Floor/tile4.png');
loadSprite('tile5', 'assets/Floor/tile5.png');
loadSprite('tile6', 'assets/Floor/tile6.png');

//Personnages
loadSprite('klint', 'assets/cowboy/klint.png',{
  sliceX: 7,
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
        to: 22,
        speed: 2,
      },
      stress: {
        from: 22,
        to: 23,
        speed: 9,
        loop: true,
      },
      frustrate: {
        from: 24,
        to: 24,
      },
      handsup: {
        from: 25,
        to: 26,
        speed: 3,
        loop: true,
      },
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
        to: 38,
        speed: 3,
      },
      stress: {
        from: 38,
        to: 39,
        speed: 9,
        loop: true,
      },
    },
});

loadSprite("oldben", "assets/cowboy/old ben.png", {
  sliceX: 7,
  sliceY: 7,
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
      affraid: {
        from: 14,
        to: 20,
        speed: 3,
      },
      stress: {
        from: 21,
        to: 22,
        speed: 6,
        loop: true,
      },
      switch: {
        from: 23,
        to: 27,
        speed: 3,
      },
      rage: {
        from: 27,
        to: 28,
        speed: 6,
        loop: true,
      },
      spit: {
        from: 29,
        to: 42,
        speed: 6,
      },
    },
});

loadSprite("ramon", "assets/cowboy/ramon.png", {
  sliceX: 7,
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
      to: 12,
      speed: 4,
    },
    affraid: {
        from: 13,
        to: 21,
        speed: 3,
    },
    stress: {
      from: 21,
      to: 22,
      speed: 9,
      loop: true,
    },
    smile: {
      from: 23,
      to: 23,
    },
    flex: {
      from: 23,
      to: 25,
      speed: 3,
    },
    sad: {
      from: 26,
      to: 27,
      speed: 2,
      loop: true,
    },
  },
});

loadSprite("leviticus", "assets/cowboy/leviticus.png", {
  sliceX: 8,
  sliceY: 5,
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
      to: 12,
      speed: 4,
    },
    affraid: {
        from: 13,
        to: 19,
        speed: 3,
    },
    stress: {
      from: 20,
      to: 21,
      speed: 9,
      loop: true,
    },
    smoke: {
      from: 22,
      to: 27,
      speed: 5,
      loop: true,
    },
    stopsmoke: {
      from: 28,
      to: 33,
      speed: 3,
    },
    givemoney: {
      from: 34,
      to: 36,
      speed: 2,
    },
    takemoney: {
      from: 37,
      to: 38,
      speed: 2,
    },
  },
});

loadSprite("calamity", "assets/cowboy/kalamity.png", {
  sliceX: 5,
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
      to: 18,
      speed: 4,
    }
  },
});

loadSprite('badbill', 'assets/cowboy/badbill.png',{
  sliceX: 5,
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
      frustrate: {
        from: 14,
        to: 14,
      }
    },
});

loadSprite('badbillvener', 'assets/cowboy/badbillvener.png',{
  sliceX: 8,
  sliceY: 6,
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
      rage: {
        from: 14,
        to: 23,
        speed:4,
        loop: true,
      },
      reflexion: {
        from: 27,
        to: 28,
        speed: 4,
        loop: true,
      },
      rmrage: {
        from: 29,
        to: 32,
        speed: 2,
      },
      rmmask: {
        from: 33,
        to: 41,
        speed: 3,
      },
      excited: {
        from: 41,
        to: 42,
        speed: 3,
        loop: true,
      },
    },
});

//Piafs
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

loadSprite("vulture", "assets/birds/vulture2.png", {
  sliceX: 3,
  sliceY: 4,
  anims: {
    fly: {
      from: 0,
      to: 9,
      loop: true,
      speed: 6, 
    },
  },
});
loadSprite("crow", "assets/birds/crow.png", {
  sliceX: 2,
  sliceY: 8,
  anims: {
    idle: {
      from: 8,
      to: 8,
    },
    jump: {
      from: 0,
      to: 7,
      speed: 6, 
    },
    turn: {
      from: 8,
      to: 15,
      speed: 6, 
    },
  },
});

loadSprite("tumbleweed", "assets/backgrounds/tumbleweed.png", {
  sliceX: 3,
  sliceY: 3,
  anims: {
    roll: {
      from: 0,
      to: 7,
      sped: 6,
      loop: true,
    },
  },
});

loadSprite('oilwell', 'assets/backgrounds/oilwell.png', {
  sliceX: 4,
  sliceY: 2,
  anims: {
    oil: {
      from: 0,
      to: 5,
      sped: 9,
      loop: true,
    },
  },
});


// Sons
loadSound('angry', "assets/sounds/angry.mp3");
loadSound('badbillangry', "assets/sounds/bbillangry.mp3");
loadSound('grunt', "assets/sounds/grunt.mp3");
loadSound('badbillrage', "assets/sounds/bbillrage.mp3");
loadSound('holster', "assets/sounds/holster.mp3");
loadSound('gunshot', "assets/sounds/gunshot.mp3");
loadSound('spit', "assets/sounds/spit.mp3");

loadSound('vent', "assets/sounds/wind.mp3");
loadSound('bird', "assets/sounds/bird1.mp3");
loadSound('animal', "assets/sounds/animal.mp3");
loadSound('mouse', "assets/sounds/mouse.mp3");
loadSound('bird2', "assets/sounds/bird2.mp3");
loadSound('dog', "assets/sounds/dog.mp3");

loadSound('mainmusic', "assets/sounds/musics/main.mp3");
loadSound('musicduelfinal', "assets/sounds/musics/Americana.mp3");
loadSound('standoff', 'assets/sounds/musics/standoff.mp3');
loadSound('endstandoff', "assets/sounds/musics/endstandoff.mp3");
loadSound('namereveal', "assets/sounds/musics/namereveal.mp3");

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
        width: 450,
      },
      dialogText: {
        color: BLACK,
        options: {
          width: 400,
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
        width: 450,
      },
      dialogText: {
        color: BLACK,
        options: {
          width: 400,
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
              width: 350,
              align: "center",
            },
        },
      },
  },
});

const gamestate = { 
  shotmeter: 0
}
window.shotmeter = gamestate.shotmeter; 

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
            const animals = ["bird", "animal", "dog", "mouse", "bird2"];
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

    // On annule le timer en cours pour stopper la boucle infinie
    if (animalTimer) {
        animalTimer.cancel(); 
        animalTimer = null;
    }
}

homeScene(gamestate);
duel1(myTiles, gamestate, ambiancesonore, stoptout, fondusonore);
duel2(myTiles, gamestate, ambiancesonore, stoptout, fondusonore);
duel3(myTiles, gamestate, ambiancesonore, stoptout, fondusonore);
arrestation(myTiles, ambiancesonore, stoptout, fondusonore);
duelfinal(myTiles, ambiancesonore, stoptout, fondusonore);
perdu();

go("duelfinal");