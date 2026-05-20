export function gagné(myTiles) {
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
            sprite('bgduel3', { 
                width: width(),
                height: height(),
            }),
            pos(0, 0),
            anchor("topleft"),
        ]);

        const box = add([
            rect(650, 250, { radius: 20 }),
            pos(width()-500, height()/2),
            anchor('center'),
            opacity(0),
            z(100),
        ]);
        box.add([
            text("Victoire !!!"),
            anchor("center"),
            scale(0.65),
            color(0, 0, 0),
            pos(0, 0),
        ]);
        let texte = box.add([
            text("Klint a réussi à retrouver Bad Bill et à le ramener dasn le droit chemin !"),
            anchor("center"),
            color(RED),
            scale(0.45),
            pos(0, 50),
        ]);

        // let sol = addLevel([
        //     "6nn12n35",
        //     "00000000",
        // ],{
        //     pos: vec2(0, height() / 2 + 250),
        //     tileWidth: 150,
        //     tileHeight: 153,
        //     tiles: myTiles,
        // });

        // sol.use(z(10));

        const outro = play("endstandoff", {
            volume: 1,
        })
        tween(1, 0, 3, (val) => rideau.opacity = val, easings.linear)

        onKeyPress("enter", () => {
            tween(0, 1, 3, (val) => rideau.opacity = val, easings.linear).onEnd(() => {
                go("menu")
            })
        });

    });
};