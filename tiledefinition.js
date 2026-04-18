const baseTile = (spriteName) => [
    sprite(spriteName),
    scale(3),
    anchor("bot"),
    area({ width: 50, height: 32, offset: vec2(0, 19) }), 
    body({ isStatic: true }),
    z(6),
];

export const myTiles = {
    "0": () => baseTile("tile0"),
    "n": () => baseTile("tile0.5"),
    "1": () => baseTile("tile1"),
    "2": () => baseTile("tile2"),
    "3": () => baseTile("tile3"),
    "4": () => baseTile("tile4"),
    "5": () => baseTile("tile5"),
    "6": () => baseTile("tile6"),
};