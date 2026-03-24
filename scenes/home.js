export function homeScene() {
    scene("menu", () => {

        add([
            sprite('homebg'),
            pos(0, 0),
            scale(width() / 200, height() / 133),
            anchor("topleft"), 
        ]);

        loop(20, () => {

            const bird = add([
                sprite("birds"),
                pos(-50, rand(20, 200)),
                area(),
                move(RIGHT, 200),
                z(10),
                "bird",
            ]);
            bird.flipX = true;
            bird.play("fly");
        });
        onUpdate("bird", (b) => {
            if (b.pos.x > width() + 50) {
                destroy(b);
            }
        });


        add([
            sprite('poteau'),
            pos(650, -500),
            scale(2),
            z(70),
        ]);

        const box = add([
            rect(650, 250, { radius: 20 }),
            pos(width()/2 -230, height()/2),
            anchor('center'),
            opacity(0),
            z(100),
        ]);

        box.add([
            text("KLINT"),
            anchor("center"),
            scale(4),
            color(256, 8, 8),
            pos(0, 0),
        ]);

        let texte = box.add([
            text("Appuye sur Espace pour commencer à traquer Bad Bill"),
            anchor("center"),
            color(RED),
            scale(0.5),
            pos(0, 75),
        ]);

        onKeyPress("space", () => {
            const homesound = play("homesound", {
                volume: 1,
            })
            texte.destroy()
            const mask = add([
                rect(width(), height()),
                color(0, 0, 0),
                opacity(0),
                fixed(),
                z(100),
            ])

            tween(0, 1, 4, (val) => mask.opacity = val, easings.linear).onEnd(() => {
                go("duel1")
            })
        });
    });
}

