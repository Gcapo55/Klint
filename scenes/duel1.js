export function duel1() {
    scene("duel1", () => {

        setGravity(1000)

        let klint = add([
            sprite("klint"),
            pos(100, 200),
            scale(5),
            area(),
            body(),
        ])

        loquace.characters({
            r: {
                name: 'Robot',
                expressions: {
                    happy: 'robot-head-happy',
                    sad: 'robot-head-sad',
                },
                defaultExpression: 'happy',
                dialogType: 'pop',
                position: 'topleft',
                dialogOptions: {
                    position: 'topleft',
                    doTween: false,
                    dialogText: {
                        color: RED,
                    },
                },
            },
        });

        let ennemi = add([
            rect(150, 270),
            color(BLACK),
            pos(width()-300, 200),
            area(),
            body(),
        ])



        // Dialogues 

        loquace.script([
        "Hello world from KAPLAY Loquace",
        "This is a narrator dialog",
        "Hi my name is Klint",
        ])

        onKeyPress("enter", () => {
                loquace.next()
        });


        let tension = 0
        let maxtension = 100
        let dueltime = 0
        let timeingreen = 0 // si Klint reste dans la zone verte
        let isduelactive = false; // en combat
        let ishooting = false; // verrou
        let isrelaxing = false;
        let isfocusing = false;
        let hasshot = false; //si Klint à tiré, il ne peux plus utiliser le focus ni le realx

        // Barre de tension
        let barfond = add([
            rect(500, 20),
            pos(50, 50),
            color(BLUE),
            z(1)
        ])
        barfond.add([
            pos(400, 0),
            rect(100, 20),
            color(RED),
            z(2),
        ])
        barfond.add([
            pos(350, 0),
            rect(50, 20),
            color(GREEN),
            z(2),
        ])

        let bar = add([
            rect(0, 20),
            pos(50, 50),
            color(WHITE),
            opacity(1),
            z(10),
        ])

        // provoquer le duel
        onKeyPress("d", () => {
            isduelactive = true;
        })

        // focus
        onKeyPress("space", () => { 
            isfocusing = true;
            isrelaxing = false;
        });
        onKeyRelease("space", () => { 
            isfocusing = false; 
            // si on lâche Space mais qu'on tient encore Shift
            if (isKeyDown("shift")) isrelaxing = true; 
        });

        // relax
        onKeyPress("shift", () => { 
            isrelaxing = true;
            isfocusing = false;

        });
        onKeyRelease("shift", () => { 
            isrelaxing = false; 
            // si on lâche Shift mais qu'on tient encore Space
            if (isKeyDown("space")) isfocusing = true;
        });
        onKeyPress("enter", () => {
            if (isfocusing && !ishooting && !hasshot && tension >=80) {
                ishooting = true;
                hasshot = true;
                klint.play("shooting");
            }
        });

        onUpdate(() => {
            if (!isduelactive) return

            if (tension >= 70 && tension <= 80) {
                timeingreen += dt()
                console.log(timeingreen)
            }

            dueltime += dt()
            if (dueltime <= 30){
                tension += 1 * dt()
            }
            else if (dueltime <= 40) {
                tension += 5 * dt()
            }
            else if (dueltime <= 50) {
                tension += 8.5 * dt()
            }
            else if (dueltime <= 60) {
                tension += 11 * dt()
            }
            else {
                tension += 13 * dt()
            }

            // déclancheurs d'animations
            if (ishooting) {
                isduelactive = false;
            }
            else if (isfocusing) {
                if (klint.curAnim() !== "focus") klint.play("focus");
            } 
            else if (isrelaxing) {
                if (klint.curAnim() !== "relax") klint.play("relax");
            } 
            else {
                if (klint.curAnim() !== "idle") klint.play("idle");
            }

            if (timeingreen > 15) {
                isduelactive = false
                console.log("fin du combat")
                klint.play("relax")
            }

            // Augmenter et diminuer tension
            if (isfocusing) {
                tension += 7 * dt() // 40x par sec
                console.log("la tension augmente")
            } 
            else if (isrelaxing) {
                tension -= 10 * dt()
                console.log("la tension diminue")
            }

            tension = Math.max(0, Math.min(maxtension, tension))

            // Update barre visuelle
            bar.width = (tension / maxtension) * 500
        })

        const level = addLevel([
            "6nn5n61nn55",
            "00000000000",
        ], {
            pos: vec2(0, height()/2 + 250),
            tileWidth: 50*3,
            tileHeight: 51*3,

            // Définition des syboles : 
            tiles: {
                "0": () => [
                    sprite("tile0"),
                    scale(3),
                    anchor("bot"),
                    area({shape : new Rect(vec2(), 50, 32)}),
                    body({ isStatic: true }),
                ],

                "n": () => [
                    sprite("tile0.5"),
                    scale(3),
                    anchor("bot"),
                    area({shape : new Rect(vec2(), 50, 32)}),
                    body({ isStatic: true }),
                ],

                "1": () => [
                    sprite("tile1"),
                    scale(3),
                    anchor("bot"),
                    area({shape : new Rect(vec2(), 50, 32)}),
                    body({ isStatic: true }),
                ],

                "2": () => [
                    sprite("tile2"),
                    scale(3),
                    anchor("bot"),
                    area({shape : new Rect(vec2(), 50, 32)}),
                    body({ isStatic: true }),
                ],

                "3": () => [
                    sprite("tile3"),
                    scale(3),
                    anchor("bot"),
                    area({shape : new Rect(vec2(), 50, 32)}),
                    body({ isStatic: true }),
                ],

                "4": () => [
                    sprite("tile4"),
                    scale(3),
                    anchor("bot"),
                    area({shape : new Rect(vec2(), 50, 32)}),
                    body({ isStatic: true }),
                ],

                "5": () => [
                    sprite("tile5"),
                    scale(3),
                    anchor("bot"),
                    area({shape : new Rect(vec2(), 50, 32)}),
                    body({ isStatic: true }),
                ],

                "6": () => [
                    sprite("tile6"),
                    scale(3),
                    anchor("bot"),
                    area({shape : new Rect(vec2(), 50, 32)}),
                    body({ isStatic: true }),
                ],
            },
        });
    });
}