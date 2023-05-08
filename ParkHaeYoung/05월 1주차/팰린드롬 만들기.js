const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const numbers = input.shift();

// dp[a][b] : a부터 b까지의 부분 수열을 팰린드롬으로 만들기 위해 끼워 넣어야 할 숫자의 최소 개수
// dp[a][b] = dp[a+1][b-1]
// a 번째 수열의 수와 b 번째 수열의 수가 다르다 : dp[a][b] = Math.min(dp[a+1][b], dp[a][b-1]) + 1


const dp = Array.from({length: N + 1 }, () => Array(N + 1).fill(-1));

function solution(a, b) {
    if(dp[a][b] !== -1) return dp[a][b];
    if(a >= b) {
        dp[a][b] = 0;
        return dp[a][b];
    }

    if(numbers[a] === numbers[b]) dp[a][b] = solution(a + 1, b - 1);
    else dp[a][b] = Math.min(solution(a, b - 1), solution(a + 1, b)) + 1;

    return dp[a][b];
}

for(let i = 0; i < N - 1; i++) {
    for(let j = i + 1; j < N; j++) {
        solution(i, j);
    }
}

console.log(dp[0][N - 1]);