const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const direction = input.shift();

const dp = Array.from({length: 5}, () => Array.from({length: 5}, () => Array(direction.length + 1).fill(0)))

function stepCount(from, to) {
    if(from === to) return 1;
    switch (from) {
        case 0:
            return to === 0 ? 0 : 2;
        case 1:
            return to === 3 ? 4 : 3;
        case 2:
            return to === 4 ? 4 : 3;
        case 3:
            return to === 1 ? 4 : 3;
        case 4:
            return to === 2 ? 4 : 3;
    }
}

function solution (left, right, step) {
    if(step === direction.length - 1) return 0;
    const current = dp[left][right][step];
    if(current !== 0) return current;
    // 왼발을 움직이는 경우 & 오른발을 움직이는 경우
    dp[left][right][step] = Math.min(
        stepCount(left, direction[step]) + solution(direction[step], right, step + 1),
        stepCount(right, direction[step]) + solution(left, direction[step], step + 1)
    );

    return dp[left][right][step];
}

const result = solution(0, 0, 0);

console.log(result);