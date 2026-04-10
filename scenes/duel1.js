export function duel1() {
    scene("duel1", () => {

        let tension = 0
        let maxtension = 100
        let dueltime = 0
        let timeingreen = 0 // si reste dans la zone verte
        let timeinred = 0 // si reste dans la zone rouge
        let isduelactive = false // en combat
        let ishooting = false
        let isrelaxing = false
        let isfocusing = false
        let hasshot = false //si Klint à tiré, il ne peux plus utiliser le focus ni le realx
        let tensionTarget = 0
        let lastSpikeTime = 0
        let nextSpikeDelay = 10
        let isangry = false

        setGravity(1000)

        let klint = add([
            sprite("klint"),
            pos(100, 200),
            scale(5),
            area(),
            body(),
        ])

        
        let ennemi = add([
            rect(150, 270),
            color(BLACK),
            pos(width()-300, 200),
            area(),
            body(),
        ])

        // Dialogues 
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
                    dialogText: {
                        color: BLACK,
                    },
                },
            },

        });

        // wait(5, () => {
        //     loquace.script([
        //         'n Appuye sur "Enter" pour faire défiler les dialogues !',
        //         "e Halte étranger",
        //         "k Bonjour ! Je parle dans une bulle.",
        //         "k Et j'avance toujours avec Entrée.",
        //     ]);

        // });

        // onKeyPress("enter", ()=> {
        //     loquace.next()
        // })

        // Barre de tension
        let barfond = add([
            rect(500, 20),
            pos((width()/2)-250, height()/10),
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

        // barre ajustable
        let bar = add([
            rect(0, 20),
            pos((width()/2)-250, height()/10),
            color(WHITE),
            opacity(1),
            z(10),
        ])

        bar.hidden = true;
        barfond.hidden = true;

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

        // Change le sprite avec celui énervé (les noms des animations restent les mêmes)
        if (isangry) {
            klint.use(sprite("klintvener"));
            klint.play("rage");
        }

        onUpdate(() => {
            if (!isduelactive) return

            bar.hidden = false;
            barfond.hidden = false;

            dueltime += dt()

            // montée naturelle de la tension selon le temps  (à custom en fonction du combat)
            let naturalRise = 0
            if      (dueltime <= 30) naturalRise = 0
            else if (dueltime <= 40) naturalRise = 0
            else if (dueltime <= 50) naturalRise = 0
            else if (dueltime <= 60) naturalRise = 0
            else                     naturalRise = 0

            let inRed, inGreen
            inGreen = tension >= 70 && tension <= 80
            inRed = tension > 80   

            if (isangry) {
                if (isfocusing) {
                    tensionTarget += 20 * dt()
                } else if (isrelaxing) {
                    tensionTarget -= 20 * dt()
                }

                // Inertie : tension suit tensionTarget lentement (Rédigé par Claude)
                // Le 3 contrôle la réactivité : plus c'est bas, plus c'est "lourd"
                tensionTarget += naturalRise * dt()
                tensionTarget = Math.max(0, Math.min(maxtension, tensionTarget))
                tension += (tensionTarget - tension) * 1.5 * dt()
                tension = Math.max(0, Math.min(maxtension, tension))
            }
            else{
                if (isfocusing) {
                    tensionTarget += 12 * dt()
                } else if (isrelaxing) {
                    tensionTarget -= 12 * dt()
                }             
                
                tensionTarget += naturalRise * dt()
                tensionTarget = Math.max(0, Math.min(maxtension, tensionTarget))
                tension += (tensionTarget - tension) * 3 * dt()
                tension = Math.max(0, Math.min(maxtension, tension))
            }

            // focus de l'adversaire
            lastSpikeTime += dt()
            if (lastSpikeTime >= nextSpikeDelay) {
                let spikeDir = rand(0, 1) < 0.25 ? -1 : 1
                if (isangry) {
                    tensionTarget += spikeDir * rand(25, 35)
                } else {
                    tensionTarget += spikeDir * rand(15, 25)
                }
                lastSpikeTime = 0
                nextSpikeDelay = rand(6, 9)
            }

            if (inGreen) {
                timeingreen += dt()
                console.log(timeingreen)
            } else if (inRed) {
                timeinred += dt()
                console.log(timeinred)
            } else {
                timeingreen = Math.max(0, timeingreen - dt() * 0.5) // se vide si on va dans le bleu
                timeingreen = Math.max(0, timeinred - dt() * 0.5)
            }

            // déclencheurs d'anims
            if (ishooting) {
                isduelactive = false
            } else if (isfocusing) {
                if (klint.curAnim() !== "focus") klint.play("focus")
            } else if (isrelaxing) {
                if (klint.curAnim() !== "relax") klint.play("relax")
            } else {
                if (klint.curAnim() !== "idle")  klint.play("idle")
            }

            // Fin du duel : désamorçage
            if (timeingreen > 10) {
                isduelactive = false;
                bar.hidden = true;
                barfond.hidden = true;
                klint.use(sprite("klint"));
                klint.play("relax")
            }

            // Fin du duel : tir automatique si trop longtemps dans le rouge
            if (timeinred > 10 && !hasshot) {
                isduelactive = false;
                bar.hidden = true;
                barfond.hidden = true;
                klint.play("shooting")
                hasshot = true;

                // tu peux ajouter un timer rouge ici si tu veux un délai avant le tir forcé
            }

            // barre visuelle
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