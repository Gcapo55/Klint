export function perdu() {
    scene("perdu", () => {
        let background = add([
            rect(width(), height()),
            color(BLACK),
        ]);
    });
};