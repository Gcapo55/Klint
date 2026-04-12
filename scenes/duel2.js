export function duel2(myTiles, shotmeter) {
    scene("duel2", () => {

        addLevel([
            "6nn5n61nn55",
            "00000000000",
        ], {
            pos: vec2(0, height() / 2 + 250),
            tileWidth: 150,
            tileHeight: 153,
            tiles: myTiles,
        });
    })
}