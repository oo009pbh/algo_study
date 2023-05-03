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
    const N = parseInt(input[0])
    const numbers = input[1].split(' ').map(item => parseInt(item));
    let DP = Array.from({ length: 21 }, () => BigInt(0));
    DP[numbers.shift()] = BigInt(1);
    const goal = numbers.pop();

    for (let number of numbers) {
        const temp = Array.from({ length: 21 }, () => BigInt(0));

        for (let i = 0; i <= 20 - number; i ++) {
            if (DP[i] > BigInt(0)) {
                temp[i + number] += DP[i];
            }
        }
        for (let i = number; i <= 20; i ++) {
            if (DP[i] > BigInt(0)) {
                temp[i - number] += DP[i];
            }
        }

        DP = [...temp];
    }
    console.log(String(DP[goal]));
    process.exit();
})