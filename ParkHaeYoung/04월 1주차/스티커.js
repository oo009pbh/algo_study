const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [T] = input.shift();

function solution() {
    const answer = [];
    for(let r = 0; r < T; r++) {
        const [n] = input.shift();
        const firstLine = [0, 0, ...input.shift()];
        const secondLine = [0, 0, ...input.shift()];
        const dp = [firstLine, secondLine];
        for(let i = 2; i < n + 2; i++) {
            dp[1][i] += Math.max(dp[0][i - 2], dp[0][i - 1]);
            dp[0][i] += Math.max(dp[1][i - 2], dp[1][i - 1]);
        }
        const max = Math.max(dp[0][n + 1], dp[1][n + 1]);
        answer.push(max);
    }
    return answer;
}

const result = solution();
console.log(result.join("\n"));