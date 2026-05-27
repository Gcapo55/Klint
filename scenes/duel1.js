export function duel1(myTiles, gamestate, ambiancesonore, stoptout, fondusonore) {
    scene("duel1", () => {

        let tension = 0
        let maxtension = 100
        let dueltime = 0
        let timeingreen = 0 // si reste dans la zone verte
        let timeinred = 0 // si reste dans la zone rouge
        let isduelactive = false // en combat
        let isendsequence = false
        let ishooting = false
        let isrelaxing = false
        let isfocusing = false
        let hasshot = false //si Klint à tiré, il ne peux plus utiliser le focus ni le realx
        let tensionTarget = 0
        let lastSpikeTime = 0
        let nextSpikeDelay = 10
        let isangry = false
        let isWarning = false
        // let isParried = false

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
            pos(75, 200),
            scale(4),
            area(),
            body(),
            z(5),
        ])

        let ennemi = add([
            sprite("oldben"),
            pos(width()-275, 200),
            scale(4),
            area(),
            body(),
            z(5),
        ])

        let fond = add([
            sprite('bgduel1', { 
                width: width(),
                height: height(),
            }),
        ])

        add([
            sprite("cactus"),
            scale(3),
            pos(600, height()/2+60),
        ])
        add([
            sprite("cactus"),
            scale(6),
            pos(500, height()/2-30),
        ])

        add([
            sprite("rock"),
            scale(5),
            pos(width()-50*5, 200),
        ])

        let fences = add([
            sprite("fences"),
            scale(1.2),
            pos(0, 340),
        ])


        let crow = fences.add([
            sprite("crow"),
            scale(0.5),
            pos(327, -25),
        ])
        crow.flipX = true;
        crow.play("idle");
        loop(15, () => {
            const anim = choose(["jump", "turn"]); //choisi soit jump soit turn au hasard
            crow.play(anim);
        });

        // indicateur de contre
        // let parryIndicator = add([
        //     text("✓", { size: 100 }),
        //     pos(ennemi.pos.x + 125, ennemi.pos.y - 100),
        //     fixed(),
        //     z(20),
        //     opacity(0),
        // ])

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
        let spitsound = play("spit", {
            paused: true,
            volume: 1,
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
                indications.hidden = true; 
            });
            // loquace.registerCommand("showi", () => {
            //     parryIndicator.opacity = 1
            //     parryIndicator.color = GREEN
            // });
            // loquace.registerCommand("hidei", () => {
            //     parryIndicator.opacity = 0
            // });

            let grow = false;
            let decrease = false;
            let jump = false;
            let jumptimer = 0;
            let switchDir = true;

            onUpdate(() => {
                if (grow) {
                    tension += 20 * dt();
                    tensionTarget = tension; 
                } else if (decrease) {
                    tension -= 20 * dt();
                    tensionTarget = tension;
                } else if (jump) {
                    jumptimer += dt();

                    if (jumptimer >= 3) {
                        ennemi.play("focus")

                        switchDir = !switchDir;
                        let jumpdir = switchDir ? -1 : 1;
                        tensionTarget = clamp(tension + (jumpdir * 35), 0, 100);
                        jumptimer = 0;
                        wait(2, () => {
                            ennemi.play("idle")
                        })
                    }

                    tension = lerp(tension, tensionTarget, 3 * dt());
                }

                if (!jump) {
                    if (tension > 100) tension = 0;
                    if (tension < 0) tension = 100;
                } else {
                    tension = clamp(tension, 0, 100);
                }

                bar.width = (tension / maxtension) * 499
                if (bar.width >= 497) {
                    bar.radius = [5, 5, 5, 5]; 
                } else if (bar.width >= 495) {
                    bar.radius = [5, 4, 4, 5];
                } else if (bar.width >= 493) {
                    bar.radius = [5, 2.5, 2.5, 5]; 
                } else {
                    bar.radius = [5, 0, 0, 5]; 
                }
            });

            loquace.registerCommand("focus", () => {
                klint.play("focus")
            });
            loquace.registerCommand("relax", () => {
                klint.play("relax")
            });
            loquace.registerCommand("idle", () => {
                klint.play("idle")
            });
            loquace.registerCommand("efocus", () => {
                ennemi.play("focus")
            });
            loquace.registerCommand("eidle", () => {
                ennemi.play("idle")
            });
            loquace.registerCommand("espit", () => {
                wait(0.4, () => {
                    ennemi.play("spit")
                });
                spitsound.play();
            });
            loquace.registerCommand("aug", () => {
                grow = true;
            });
            loquace.registerCommand("dec", () => {
                decrease = true;
            });
            loquace.registerCommand("jump", () => {
                jump = true;
                tension = 50;
                tensionTarget = 50;
                jumptimer = 3;
            });
            loquace.registerCommand("stop", () => {
                decrease = false;
                grow = false;
                jump = false;
                tension = 0;
                tensionTarget = 0;
            });
            

            // Change le sprite avec celui énervé (les noms des animations restent les mêmes)
            let alreadyrage = false;
            let alreadyfrustrate = false;
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
                    angrysound.play();
                }
            });
        }


        // Barre de tension
        let barfond = add([
            rect(500, 20, {radius: [5, 5, 5, 5]}),
            pos((width()/2)-250, height()/10),
            color(rgb(82, 133, 192)),
            z(1),
            outline(2, rgb(18, 41, 66)),
        ])
        barfond.add([
            pos(400, 0.5),
            rect(99, 18,  {radius: [0, 5, 3, 0]}),
            color(rgb(231, 42, 0)),
            z(1),
        ])
        barfond.add([
            pos(350, 0.5),
            rect(50, 18),
            color(rgb(129, 249, 0)),
            z(1),
        ])

        let indications = barfond.add([
            pos(250, 30),
            anchor("center"),
            text("◀ X | Espace ▶"),
            scale(0.3),
            color(BLACK),
            z(2),
        ])

        // barre ajustable
        let bar = barfond.add([
            rect(0, 18, {radius: [5, 0, 0, 5]}),
            pos(0.5, 0.5),
            color(WHITE),
            opacity(1),
            z(2),
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
            // si on lâche Space mais qu'on tient encore X
            if (isKeyDown("x")) isrelaxing = true; 
        });

        // relax
        onKeyPress("x", () => { 
            isrelaxing = true;
            isfocusing = false;

        });
        onKeyRelease("x", () => { 
            isrelaxing = false;
            // si on lâche X mais qu'on tient encore Space
            if (isKeyDown("space")) isfocusing = true;
        });

        // Contre
        // onKeyPress("d", () => {
        //     if (isWarning && isduelactive) {
        //         isParried = true;
        //         parryIndicator.text = "✓";
        //         parryIndicator.color = GREEN;
        //         parryIndicator.opacity = 1;
        //     }
        // })

        // Fonction qui s'execute à chaque seconde
        onUpdate(() => {
            if (!isduelactive) return

            bar.hidden = false;
            barfond.hidden = false;
            indications.hidden = false;

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

            if (lastSpikeTime >= nextSpikeDelay * 0.8 && !isWarning) {
                isWarning = true
                // isParried = false
                ennemi.play("focus")
            }

            if (lastSpikeTime >= nextSpikeDelay) {
                isWarning = false
                let spikeDir = rand(0, 1) < 0.25 ? -1 : 1
                // let spikeMult = isParried ? 0.25 : 1
                if (isangry) {
                    tensionTarget += spikeDir * rand(45, 50)
                    nextSpikeDelay = rand(3, 6)
                } else {
                    tensionTarget += spikeDir * rand(25, 30)
                    nextSpikeDelay = rand(6, 9)
                }

                // le symbole est différent si le timing a été foiré
                // if (isParried) {
                //     parryIndicator.text = "✓"
                //     parryIndicator.color = GREEN
                // } else {
                //     parryIndicator.text = "✗"
                //     parryIndicator.color = RED
                // }
                // parryIndicator.opacity = 1

                lastSpikeTime = 0
                // isParried = false
                wait(2, () => {
                    if (isduelactive) {
                        ennemi.play("idle")
                    }
                    // parryIndicator.opacity = 0
                })
            }
            // barre visuelle
            bar.width = (tension / maxtension) * 499
            if (bar.width >= 497) {
                bar.radius = [5, 5, 5, 5]; 
            } else if (bar.width >= 495) {
                bar.radius = [5, 4, 4, 5];
            } else if (bar.width >= 493) {
                bar.radius = [5, 2.5, 2.5, 5]; 
            } else {
                bar.radius = [5, 0, 0, 5]; 
            }

            if (inGreen) {
                timeingreen += dt()
                console.log("Good" + timeingreen)
            } else if (inRed) {
                timeinred += dt()
                console.log("Bad" + timeinred)
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
                if (!isendsequence && klint.curAnim() !== "idle") klint.play("idle")
            }

            // Fin du duel : désamorçage
            if (timeingreen > 12) {
                let verrou = false;
                // parryIndicator.opacity = 0;
                isduelactive = false;
                isendsequence = true;
                bar.hidden = true;
                barfond.hidden = true;
                klint.use(sprite("klint"));
                klint.play("relax");
                ennemi.play("idle");

                wait(1, () => {
                    loquace.start("d1goodend");
                    onKeyPress("space", () => {
                        const hasNext = loquace.next();
                        if (!hasNext && !verrou) {
                            verrou = true;
                            fondusonore(mainmusic, 2)
                            wait(2, () => {
                                standoff.play();
                                fermerRideau(3).onEnd(() => {
                                    go("duel2")
                                });
                            });
                        };
                    });
                });

            }

            // Fin du duel : l'adversaire tire
            if (dueltime > 60) {
                let verrou = false;
                // parryIndicator.opacity = 0;
                klint.play("idle")
                isduelactive = false;
                isendsequence = true;
                bar.hidden = true;
                barfond.hidden = true;
                mainmusic.stop();
                ennemi.play("shoot");
                holstersound.play();
                wind.play();
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
                wait(4, () => {
                    loquace.start("d1badend");
                    onKeyPress("space", () => {
                        const hasNext = loquace.next();
                        if (!hasNext && !verrou) {
                            verrou = true;
                            wait(2, () => {
                                wind.stop();
                                fermerRideau(3).onEnd(() => {
                                    go("perdu")
                                });
                            });
                        };
                    })
                });
            }

            // Fin du duel : tir automatique si trop longtemps dans le rouge
            if (timeinred > 10 && !hasshot) {
                let verrou = false;
                // parryIndicator.opacity = 0;
                isduelactive = false;
                isendsequence = true;
                bar.hidden = true;
                barfond.hidden = true;
                mainmusic.stop();
                klint.play("shoot");
                ennemi.play("idle");
                holstersound.play();
                wind.play();
                wait(0.7, () => {
                    gunsound.play();
                });
                wait(0.8, () => {
                    ennemi.play("affraid");
                    
                    ennemi.onAnimEnd((anim) => {
                        if (anim === "affraid") {
                            ennemi.play("stress");

                            wait(5, () => {
                                ennemi.play("switch");
                                ennemi.onAnimEnd((anim) => {
                                    if (anim === "switch") {
                                        ennemi.play("rage");
                                    }
                                });
                            });
                        }
                    });
                });
                hasshot = true;
                gamestate.shotmeter++;
                wait(6, () => {
                    loquace.start("d1shot");
                    onKeyPress("space", () => {
                        const hasNext = loquace.next();
                        if (!hasNext && !verrou) {
                            verrou = true;
                            wait(2, () => {
                                wind.stop();
                                standoff.play();
                                fermerRideau(3).onEnd(() => {
                                    go("duel2")
                                });
                            });
                        };
                    })
                });
            }
        })

        addLevel([
            "6n561nn5",
            "00000000",
        ],{
            pos: vec2(0, height() / 2 + 250),
            tileWidth: 150,
            tileHeight: 153,
            tiles: myTiles,
        });
    });
}