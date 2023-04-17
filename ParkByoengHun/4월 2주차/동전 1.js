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
    const [n, k] = input[0].split(" ").map(item => parseInt(item));
    let answer = 0;
    let cache = Array(k + 1).fill(0);

    for (let i = 1; i <= n; i ++) {
        const coin = parseInt(input[i]);

        for (let j = 1; j * coin <= k; j ++) {
            cache[j * coin] += 1;
        }
    }

    for (let i = 1; i < Math.floor(k / 2); i ++) {
        answer += cache[i] * cache[k - i];
    }

    console.log(answer);
    process.exit();
})