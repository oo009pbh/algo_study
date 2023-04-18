
const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [N] = input.shift();

const dp = Array.from({ length: 3 }, () => Array.from({ length: N }, () => Array(N).fill(0)));
dp[0][0][1] = 1;

// dp[0][row][col] = 가로 파이프에 대한 dp
// dp[1][row][col] = 대각선 파이프에 대한 dp
// dp[2][row][col] = 세로 파이프에 대한 dp

for(let i = 2; i < N; i++){
    if(input[0][i] === 0)
        dp[0][0][i] = dp[0][0][i - 1];
}

for(let r = 1; r < N; r++) {
    for(let c = 1; c < N; c++) {
        // 대각선 파이프 계산
        if(input[r][c] === 0 && input[r][c - 1] === 0 && input[r - 1][c] === 0) {
            dp[1][r][c] = dp[0][r - 1][c - 1] + dp[1][r - 1][c - 1] + dp[2][r - 1][c - 1];
        }
        // 가로, 세로 파이프 계산
        if(input[r][c] === 0) {
            dp[0][r][c] = dp[0][r][c - 1] + dp[1][r][c - 1];
            dp[2][r][c] = dp[2][r - 1][c] + dp[1][r - 1][c];
        }
    }
}

const result = dp.reduce((prev, curr, idx) => {
    return prev + curr[N - 1][N - 1];
}, 0);
console.log(result);
// console.log(dp[0][N - 1][N - 1] + dp[1][N - 1][N - 1] + dp[2][N - 1][N - 1]);