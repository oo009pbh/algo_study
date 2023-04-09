const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n").map((el) => el.trimEnd().split(""));

const word1 = input.shift();
const word2 = input.shift();

const r = word1.length;
const c = word2.length;

const dp = Array.from({ length: c + 1 }, () => Array(r + 1).fill(0));

for(let i = 1; i <= c; i++) {
    for(let j = 1; j <= r; j++) {
        if(word2[i - 1] === word1[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
}
console.log(dp[c][r])
