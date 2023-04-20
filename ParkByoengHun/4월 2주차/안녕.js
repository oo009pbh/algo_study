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
    const N = parseInt(input[0]);
    const hurt = input[1].split(" ").map((item) => parseInt(item));
    const joy = input[2].split(" ").map((item) => parseInt(item));
    let DP = Array.from({ length: N }, (v, i) => Array(101).fill(0));

    DP[0][100 - hurt[0]] = joy[0];

    for (let i = 1; i < N; i ++) {

        DP[i][100 - hurt[i]] = joy[i];

        for (let j = 1; j <= 100; j ++) {
            if (j + hurt[i] <= 100 && DP[i - 1][j + hurt[i]]) {
                DP[i][j] = Math.max(DP[i - 1][j] , joy[i] + DP[i - 1][j + hurt[i]])
            } else {
                DP[i][j] = Math.max(DP[i - 1][j], DP[i][j]);
            }
        }
    }

    let maxValue = 0;
    for (let j = 1; j <= 100; j ++) {
        maxValue = Math.max(DP[N - 1][j], maxValue);
    }

    console.log(maxValue);
    process.exit();
})