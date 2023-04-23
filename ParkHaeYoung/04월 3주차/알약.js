const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);

const dp = Array.from({ length: 31 }, () => Array(31).fill(0));

for(let h = 0; h <= 30; h++) {
    for(let w = 0; w <= 30; w++) {
        if(h > w) continue;
        if(h === 0) dp[w][h] = 1;
        else dp[w][h] = dp[w - 1][h] + dp[w][h - 1];
    }
}

input.slice(0, -1).forEach((el) => {
    console.log(dp[el][el]);
});