export function gagné(myTiles, fondusonore) {
    scene("gagné", () => {

        let rideau = add([
            rect(width(), height()),
            color(BLACK),
            opacity(1), // tout est noir par défaut
            fixed(),
            z(999),
        ]);

        // fct pour mettre en plein écran
        onKeyPress("p", () => {
          setFullscreen(!isFullscreen());
        });

        add([
            sprite('bggagné', { 
                width: width(),
                height: height(),
            }),
            pos(0, 0),
            anchor("topleft"),
        ]);

        add([
            sprite("cactus"),
            scale(3),
            pos(350, height()/2+60),
        ])
        add([
            sprite("cactus"),
            scale(3),
            pos(500, height()/2+60),
        ])
        let cactus = add([
            sprite("cactus"),
            scale(6),
            pos(600, height()/2-30),
            z(3),
        ])
        cactus.flipX = true;

        let rocher = add([
            sprite("rocher"),
            scale(3),
            pos(2, height()/2+50),
            z(3),
        ])

        add([
            sprite('badbillcheval'),
            pos(50, 165),
            scale(5),
            z(10),
        ]);
        add([
            sprite('klintcheval'),
            pos(170, 165),
            scale(5),
            z(10),
        ]);

        const box = add([
            rect(650, 250, { radius: 20 }),
            pos(width()-250, 100),
            anchor('center'),
            opacity(0),
            scale(1.22),
            z(100),
        ]);
        box.add([
            text("Victoire !!!"),
            anchor("center"),
            scale(1),
            color(0, 0, 0),
            pos(0, 0),
        ]);
        let texte = box.add([
            text("Klint a réussi à retrouver Bad Bill"),
            anchor("center"),
            color(RED),
            scale(0.45),
            pos(0, 50),
        ]);
        let texte2 = box.add([
            text("et à le ramener dans le droit chemin !"),
            anchor("center"),
            color(RED),
            scale(0.45),
            pos(0, 75),
        ]);
        box.add([
            text("Enter = Recommencer"),
            anchor("center"),
            color(BLACK),
            scale(0.45),
            pos(0, 120)
        ])

        let credits = add([
            rect(300, 50, { radius: [0, 20, 0, 0] }),
            pos(150, height()-25),
            anchor('center'),
            color(225, 155, 60),
            opacity(1),
            scale(1),
            outline(2, rgb(0, 0, 0)),
            z(50),
        ]);
        credits.add([
            text("Réalisé par Gianni Caporizzo"),
            anchor("center"),
            color(BLACK),
            scale(0.45),
            pos(0, 0),
            z(51)
        ]);

        let sol = addLevel([
            "6nn12n35",
            "00000000",
        ],{
            pos: vec2(0, height() / 2 + 250),
            tileWidth: 150,
            tileHeight: 153,
            tiles: myTiles,
        });

        sol.use(z(10));

        const outro = play("musicgagné", {
            volume: 0.8,
        })
        tween(1, 0, 3, (val) => rideau.opacity = val, easings.linear)

        onKeyPress("enter", () => {
            fondusonore(outro, 4)
            tween(0, 1, 3, (val) => rideau.opacity = val, easings.linear).onEnd(() => {
                go("menu")
            })
        });

    });
};