const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});

rl.on('close', () => {
    const [X, Y, W, S] = input[0].split(" ").map(number => parseInt(number));

    if (W * 2 <= S) {
        console.log((X + Y) * W);
    } else if (W <= S) {
        console.log(Math.abs(X - Y) * W + (Math.max(X, Y) - Math.abs(X - Y)) * S);
    } else {
        if (Math.abs(X - Y) % 2 === 0) {
            console.log((Math.max(X, Y)) * S);
        } else {
            console.log(((Math.max(X, Y)) - 1) * S + W);
        }
    }

    process.exit();
})