import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";
kaplay();
loadSprite('klint', 'assets/cowboy/klint.png',{
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
    },
})
let klint = add([
            sprite("klint"),
            pos(200, 200),
            scale(5),
            area(),
            body(),
        ])
        let tension = 0
        let maxtension = 100
        let isduelactive = true; // en combat 
        let ishooting = false; // verrou
        let isrelaxing = false;
        let isfocusing = false;
        let hasshot = false; //si Klint à tiré, il ne peux plus utiliser le focus ni le realx


klint.onAnimEnd((anim) => {
    if (anim === "shooting") {
        ishooting = false;
        // On ne force pas "idle" ici, l'update s'en chargera
    }
});

onUpdate(() => {
    if (ishooting) {
    } 
    //n'arrvive que si if shooting est faux
    else if (isfocusing && !hasshot) {
        if (klint.curAnim() !== "focus") klint.play("focus");
    } 
    else if (isrelaxing && !hasshot) {
        if (klint.curAnim() !== "relax") klint.play("relax");
    } 
    else {
        if (klint.curAnim() !== "idle") klint.play("idle");
    }
});

// --- ÉVÉNEMENTS DE TOUCHES (Juste pour changer les FLAGS) ---
onKeyPress("space", () => { isfocusing = true; });
onKeyRelease("space", () => { isfocusing = false; });

onKeyPress("shift", () => { isrelaxing = true; });
onKeyRelease("shift", () => { isrelaxing = false; });

onKeyPress("enter", () => {
    if (isfocusing && !ishooting && !hasshot) {
        ishooting = true;
        hasshot = true;
        klint.play("shooting");
    }
});
