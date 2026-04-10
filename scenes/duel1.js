export function duel1(myTiles) {
    scene("duel1", () => {

        let tension = 0
        let maxtension = 100
        let dueltime = 0
        let timeingreen = 0 // si reste dans la zone verte
        let timeinred = 0 // si reste dans la zone rouge
        let isduelactive = true // en combat
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
            sprite("calamity"),
            pos(width()-300, 200),
            scale(5),
            area(),
            body(),
        ])

        // Dialogues
        let phase2 = false;
        let phase3 = false;
        let startfight = false;
        if (!isduelactive) {
            wait(5, () => {
                loquace.start("intro");
            });
            
            onKeyPress("space", () => {
                const hasNext = loquace.next();
                if (!hasNext) {
                    if (phase3) {
                        isduelactive = true;
                    }
                    else if (phase3) {
                        startfight = true
                        const panel = loquace.choix([
                            { label: "vite fait la je crois", onSelect: () => loquace.start("brancheOui") },
                            { label: "ok.", onSelect: () => loquace.start("brancheNon") }
                        ]);
                    }
                    else if (phase2) {
                        phase3 = true;
                        const panel = loquace.choix([
                            { label: "Ouais trkl la", onSelect: () => loquace.start("brancheOui") },
                            { label: "mmhh ouise.", onSelect: () => loquace.start("brancheNon") }
                        ]);
                    }
                    else {
                        phase2 = true;
                        const panel = loquace.choix([
                            { label: "Ouais trkl la", onSelect: () => loquace.start("brancheOui") },
                            { label: "Non, laisse-moi tranquille.", onSelect: () => loquace.start("brancheNon") }
                        ]);
                    }
                }
            });
        }

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

                // Inertie : tension suit tensionTarget lentement
                // Le chiffre contrôle la réactivité : plus il est bas, plus il y de l'inertie
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
                ennemi.play("focus")
                wait(2, () => {
                    ennemi.play("idle")
                })
            }

            if (inGreen) {
                timeingreen += dt()
                console.log(timeingreen)
            } else if (inRed) {
                timeinred += dt()
                console.log(timeinred)
            } else {
                timeingreen = Math.max(0, timeingreen - dt() * 1) // se vide si on va dans le bleu
                timeingreen = Math.max(0, timeinred - dt() * 1)
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

            // Fin du duel l'adversaire à craqué
            if (dueltime > 60) {
                isduelactive = false;
                bar.hidden = true;
                barfond.hidden = true;
                ennemi.play("shooting")
                wait(1, () => {
                    klint.play("affraid")
                })
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

        addLevel([
            "6nn5n61nn55",
            "00000000000",
        ],{
            pos: vec2(0, height() / 2 + 250),
            tileWidth: 150,
            tileHeight: 153,
            tiles: myTiles,
        });
    });
}