import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";
kaplay();

loadSound('holster', "assets/sounds/holster.mp3");
loadSound('gunshot', "assets/sounds/gunshot.mp3");
let holstersound = play("holster", {
    paused: true,
    volume: 1, 
});
let gunsound = play("gunshot", {
    paused: true,
    volume: 1, 
});
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
let klint = add([
            sprite("klint"),
            pos(200, 200),
            scale(6),
            area(),
            body(),
])

let ennemi = add([
    sprite("calamity"),
    pos(width()-350, 200),
    scale(6),
    area(),
    body(),
])

 onKeyPress("shift", () => { 
             klint.play("idle")
                ennemi.play("shoot");
                holstersound.play();
                wait(0.7, () => {
                    gunsound.play();
                });
                wait(0.8, () => {
                    klint.play("affraid");
                    klint.onAnimEnd((anim) => {
                        if (anim === "affraid") {
                            klint.play("stress");
                        }
                    });
                });
        });


