const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [T, W] = input.shift();
const order = [0, ...input.flat()];

// dp[자두나무의 위치][떨어지는 시간][최대 움직일 수 있는 횟수]
// 1. 움직이지 않고, 같은 위치에서 다음 자두를 받는 경우
// 2. 움직여서 다른 위치의 자두를 받는 경우

// dp[1][T][W] = max(dp[1][T - 1][W] + 1, dp[2][T - 1][W - 1] + 1)
// dp[2][T][W] = max(dp[2][T - 1][W] + 1, dp[1][T - 1][W - 1] + 1)

const dp = Array(4).fill(null).map(() => Array(T + 1).fill(null).map(() => Array(W + 2).fill(0)));

for(let i = 1; i <= T; i++) {
    // 아예 안움직이는 경우 포함 => + 1
    for(let j = 1; j <= W + 1; j++) {
        if(order[i] === 1) {
            dp[1][i][j] = Math.max(dp[1][i - 1][j] + 1, dp[2][i - 1][j - 1] + 1);
            dp[2][i][j] = Math.max(dp[1][i - 1][j - 1], dp[2][i - 1][j]);
        } else {
            if(i === 1 && j === 1) {
                continue;
            }
            dp[1][i][j] = Math.max(dp[2][i - 1][j - 1], dp[1][i - 1][j]);
            dp[2][i][j] = Math.max(dp[1][i - 1][j - 1] + 1, dp[2][i - 1][j] + 1);
        }
    }
}

console.log(Math.max(...dp[1][T], ...dp[2][T]));