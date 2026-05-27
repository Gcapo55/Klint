export function homeScene(gamestate) {
    scene("menu", () => {

        gamestate.shotmeter = 0

        add([
            sprite('homebg', { 
                width: width(),
                height: height(),
            }),
            pos(0, 0),
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
            sprite('grandpoteau'),
            pos(630, 50),
            scale(1.3),
            z(70),
        ]);

        const monTexteBorde = add([
            pos(180, 190),
            scale(2.5),
            z(70),
        ]);

        //Aide Gemini pour générer le vecteur
        const offsets = [
            vec2(-2, -2), vec2(0, -2), vec2(2, -2),
            vec2(-2, 0),               vec2(2, 0),
            vec2(-2, 2),  vec2(0, 2),  vec2(2, 2)
        ];

        offsets.forEach(offset => {
            monTexteBorde.add([
                text("Klint", { size: 48 }),
                pos(offset),
                color(255,190,0), 
            ]);
        });

        monTexteBorde.add([
            text("Klint", { size: 48 }),
            pos(0, 0),
            color(255, 0, 0),
        ]);
        monTexteBorde.add([
            text("Appuye sur Enter pour", { size: 9 }),
            pos(75, 60),
            color(255, 0, 0),
            anchor("center"),
        ]);
        monTexteBorde.add([
            text("commencer à traquer Bad Bill", { size: 9 }),
            pos(75, 73),
            color(255, 0, 0),
            anchor("center"),
        ]);

        let alreadyenter = false;

        onKeyPress("enter", () => {
            if (alreadyenter) return; 

            alreadyenter = true;

            play("standoff", {
                volume: 1,
            });

            const mask = add([
                rect(width(), height()),
                color(0, 0, 0),
                opacity(0),
                fixed(),
                z(100),
            ]);

            tween(0, 1, 4, (val) => mask.opacity = val, easings.linear).onEnd(() => {
                go("duel1");
            });
        });
    });
}

