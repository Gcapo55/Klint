export function perdu() {
    scene("perdu", () => {

        let rideau = add([
            rect(width(), height()),
            color(BLACK),
            opacity(1), // tout est noir par défaut
            fixed(),
            z(999),
        ]);

        let background = add([
            rect(width(), height()),
            color(BLACK),
        ]);
        background.add([
            text("Klint n'est pas le héros qu'il pensait être..."/n + "Appuye sur Enter pour recommencer"),
            pos(width()/2, height()/2),
            color(WHITE),
            anchor('center'),
        ]);

        tween(1, 0, 3, (val) => rideau.opacity = val, easings.linear).onEnd(() => {
            const outro = play("endstandoff", {
                volume: 1,
            })
        })

        onKeyPress("enter", () => {
            tween(0, 1, 3, (val) => rideau.opacity = val, easings.linear).onEnd(() => {
                go("menu")
            })
        });

    });
};