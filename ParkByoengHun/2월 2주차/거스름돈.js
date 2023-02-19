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
    let N = 1000 - parseInt(input[0]);
    let answer = 0;
    let moneys = [1 , 5, 10, 50, 100, 500];
    while (N > 0) {
        if (N >= moneys[moneys.length - 1]) {
            answer += Math.floor(N / moneys[moneys.length - 1]);
            N = N % moneys[moneys.length - 1];
        } else {
            moneys.pop();
        }
    }
    console.log(answer);
    process.exit();
})