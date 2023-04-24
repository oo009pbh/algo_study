const readline = require("readline");
const util = require('util');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});

// 메모리 제한으로 js로는 풀수 없는 문제
rl.on('close', () => {
    const [T, W] = input[0].split(" ").map((item) => parseInt(item));
    let DP = Array.from({ length: 2 }, (v, i) => Array.from({ length: T + 1 }, (v, i) => Array(W + 2).fill(0)));
    for (let i = 1; i <= T; i ++) {
        const dropTree = parseInt(input[i]) - 1;
        const emptyTree = dropTree ? 0 : 1;

        for (let j = 1; j <= W + 1; j ++) {
            if (i === 1 && j === 1 && dropTree === 1) {
                continue;
            }
            DP[dropTree][i][j] = Math.max(DP[dropTree][i - 1][j] + 1, DP[emptyTree][i - 1][j - 1] + 1);
            DP[emptyTree][i][j] = Math.max(DP[dropTree][i - 1][j - 1], DP[emptyTree][i - 1][j]);
        }
        // console.log(DP)
    }
    console.log(Math.max( ...DP[0][T] , ...DP[1][T]));
    process.exit();
})