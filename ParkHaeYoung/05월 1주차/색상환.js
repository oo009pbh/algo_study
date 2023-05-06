const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const [K] = input.shift();

const MAX = 1000000003

// dp[N][K] => N 개 짜리 색상환 중 K 개를 인접하지 않게 칠하는 경우의 수
// i번 째 칸을 칠하는 경우 : dp[i - 2][j - 1]
// i번 째 칸을 안 칠하는 경우 : dp[i - 1][j]

// N번 째 칸을 칠하는 경우 : dp[N - 3][K - 1]
// N번 째 칸을 안 칠하는 경우 : dp[N - 1][K]

const dp = Array.from({length: N + 1 }, () => Array(K + 1).fill(0));
for(let i = 0; i <= N; i++) {
    dp[i][1] = i;
    dp[i][0] = 1;
}

for(let i = 2; i <= N; i++) {
    for(let j = 2; j <= K; j++) {
        dp[i][j] = (dp[i - 2][j - 1] + dp[i - 1][j]) % MAX;
    }
}
dp[N][K] = (dp[N - 1][K] + dp[N - 3][K - 1]) % MAX;

console.log(dp[N][K]);