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
    let [N, K] = input[0].split(" ").map(item => parseInt(item));
    let children = input[1].split(" ").map(item => parseInt(item));
    let diffArr = [];
    for (let i = 1 ; i < N; i ++) {
        diffArr.push(children[i] - children[i - 1]);
    }
    diffArr.sort((a , b) => b - a);
    console.log(diffArr.slice(K - 1, N).reduce((prev, cur) => prev + cur, 0));
    process.exit();
})