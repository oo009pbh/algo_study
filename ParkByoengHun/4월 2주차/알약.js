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
    let currentLine = 0;
    let DP = Array.from(Array(31), e => Array(31).fill(0));
    const recursivePill = (W, H) => {
        if(DP[W][H] === 0)
        {
            if (W === 0) {
                DP[W][H] = 1;
            }
            else if (H === 0) {
                DP[W][H] = recursivePill(W - 1, H + 1);
            }
            else {
                DP[W][H] = recursivePill(W - 1, H + 1) + recursivePill(W, H - 1)
            }

            return DP[W][H];
        }
        else
        {
            return DP[W][H];
        }
    }

    recursivePill(30, 0);

    while (true) {
        const cur = parseInt(input[currentLine ++]);
        if (cur === 0) break;
        console.log(DP[cur][0])
    }

    process.exit();
})