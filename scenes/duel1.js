export function duel1(myTiles, shotmeter, ambiancesonore, stoptout, fondusonore) {
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

        let rideau = add([
            rect(width(), height()),
            color(BLACK),
            opacity(1), // tout est noir par défaut
            fixed(),
            z(999),
        ]);

        // fondu d'entrée
        function ouvrirRideau(duree = 1) {
            return tween(1, 0, duree, (val) => rideau.opacity = val, easings.linear); // easings.linear pour faire progresser l'anim de manière constante
        }

        // fondu de sortie
        function fermerRideau(duree = 1) {
            return tween(0, 1, duree, (val) => rideau.opacity = val, easings.linear);
        }

        setGravity(1000);
        ouvrirRideau(3);

        // éléments
        let klint = add([
            sprite("klint"),
            pos(100, 200),
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

        // Musiques et sons
        let mainmusic = play("mainmusic", {
            loop: true,
            volume: 0.8,
            paused: true, 
        });

        let angrysound = play("angry", {
            paused: true,
            volume: 1, 
        });
        let holstersound = play("holster", {
            paused: true,
            volume: 1, 
        });
        let gunsound = play("gunshot", {
            paused: true,
            volume: 1, 
        });

        let wind = play("vent", {
            paused: true,
            volume: 0.8,
        })

        const standoff = play("standoff", {
                paused: true,
                volume: 1,
            })

        ambiancesonore();

        // Dialogues
        let badanswer = 0;
        let phase2 = false;
        let phase3 = false;
        let startfight = false;
        let ispanelopen = true; //verrou pour éviter de pouvoir naviguer de choix choix quand le panneau est ouvert

        if (!isduelactive) {
            wait(5, () => {
                loquace.start("d1intro");
                ispanelopen = false;
            });
            
            onKeyPress("space", () => {
                if (ispanelopen) return; //bloque la fonction pour éviter de skipper les choix

                const hasNext = loquace.next();

                if (!hasNext) {
                    ispanelopen = true;
                    if (startfight) {
                        isduelactive = true;
                        stoptout();
                        mainmusic.play();
                    }
                    else if (phase3) {
                        startfight = true
                        if (isangry) { // passe le dernier choix si klint est déjà en colère
                            loquace.start("d1phase4b");
                            ispanelopen = false;
                        } else {
                            loquace.choix([
                                { label: "Généralement, j'essaie d'éviter les conflits.", onSelect: () => {loquace.start("d1phase4g"); ispanelopen = false;} },
                                { label: "Je vais commencer par toi, vieux débris !", onSelect: () => {loquace.start("d1phase4b"); ispanelopen = false;} }
                            ]);
                        }
                    }
                    else if (phase2) {
                        phase3 = true;
                        loquace.choix([
                            { label: "Je ne veux pas d'embrouilles. Laisse-moi simplement passer...", onSelect: () => {loquace.start("d1phase3g"); ispanelopen = false;} },
                            { label: "Je vais t'envoyer six pieds sous terre et passer quand même.", onSelect: () => {loquace.start("d1phase3b"); ispanelopen = false;} }
                        ]);
                    }
                    else {
                        phase2 = true;
                        loquace.choix([
                            { label: "Si, clairement...", onSelect: () => {loquace.start("d1phase2b"); ispanelopen = false;} },
                            { label: "Je comprends, mais ce chemin est ma seule chance de retrouver Bad Bill.", onSelect: () => {loquace.start("d1phase2g"); ispanelopen = false;} }
                        ]);
                    }
                }
            });
            // On enregistre le nombre de mauvaise réponses
            loquace.registerCommand("bad", () => {
                badanswer++;
                console.log("Mauvaises réponses :", badanswer);
            });

            // affichage jauge pour explication
            loquace.registerCommand("show", () => {
                bar.hidden = false;
                barfond.hidden = false;
            });

            //exemples positions
            loquace.registerCommand("focus", () => {
                klint.play("focus")
            });
            loquace.registerCommand("relax", () => {
                klint.play("relax")
            });
            loquace.registerCommand("idle", () => {
                klint.play("idle")
            });
    
            // Change le sprite avec celui énervé (les noms des animations restent les mêmes)
            let alreadyrage = false
            let alreadyfrustrate = false
            onUpdate(() => {
                if (badanswer === 1 && !alreadyfrustrate){
                    alreadyfrustrate = true;
                    klint.play("frustrate");
                }
                else if (badanswer >= 2 && !alreadyrage) {
                    isangry = true;
                    alreadyrage = true;
                    klint.use(sprite("klintvener"));
                    klint.play("rage");
                    angrysound.play()
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

        // Fonction qui s'execute à chaque seconde
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
                    tensionTarget += spikeDir * rand(45, 50)
                    nextSpikeDelay = rand(3, 6)
                } else {
                    tensionTarget += spikeDir * rand(25, 30)
                    nextSpikeDelay = rand(6, 9)
                }
                lastSpikeTime = 0
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
            if (timeingreen > 15) {
                isduelactive = false;
                bar.hidden = true;
                barfond.hidden = true;
                klint.use(sprite("klint"));
                klint.play("relax")

                wait(1, () => {
                    loquace.start("d1goodend");
                    onKeyPress("space", () => {
                        const hasNext = loquace.next();
                        if (!hasNext) {
                            fondusonore(mainmusic, 4)
                            wait(5, () => {
                                standoff.play();
                                fermerRideau(3).onEnd(() => {
                                    go("duel2")
                                });
                            });
                        }
                    });
                });

            }

            // Fin du duel : l'adversaire tire
            if (dueltime > 60) {
                klint.play("idle")
                isduelactive = false;
                bar.hidden = true;
                barfond.hidden = true;
                mainmusic.stop();
                ennemi.play("shoot");
                holstersound.play();
                wind.play();
                wait(0.5, () => {
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
                wait(3, () => {
                    loquace.start("d1badend");
                });
                wait(15, () => {
                    standoff.play();
                    fermerRideau(3).onEnd(() => {
                        go("perdu")
                    });
                });
            }

            // Fin du duel : tir automatique si trop longtemps dans le rouge
            if (timeinred > 10 && !hasshot) {
                isduelactive = false;
                bar.hidden = true;
                barfond.hidden = true;
                mainmusic.stop()
                klint.play("shoot")
                ennemi.play("idle")
                holstersound.play();
                wind.play();
                wait(0.5, () => {
                    gunsound.play();
                });
                hasshot = true;
                shotmeter++
                wait(15, () => {
                    standoff.play();
                    fermerRideau(3).onEnd(() => {
                        go("duel2")
                    })
                })
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