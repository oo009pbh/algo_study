const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const numbers = input.shift();

// dp[i][j]에는 i번째 등식까지의 합이 j 인 경우의 개수가 담겨 있다.
// i+1번째를 추가할 때, j + numbers[i+1]과 j - numbers[i+1]이 0~20사이의 값이라면
// dp[i+1][j+numbers[i+1]]과 dp[i+1][j-numbers[i+1]]은 각각 기존의 값에 dp[i][j]를 더한 값을 가지게 된다.

// 첫째 줄에 상근이가 만들 수 있는 올바른 등식의 개수를 출력한다.
// 이 값은 263-1 이하이다. => BigInt 형식 사용
const dp = Array.from({length: N + 1 }, () => Array(21).fill(BigInt(0)));
dp[0][numbers[0]] = BigInt(1);

for(let i = 1; i < N - 1; i++) {
    for(let j = 0; j < 21; j++) {
        if(j + numbers[i] <= 20) {
            dp[i][j] += dp[i - 1][j + numbers[i]];
        }
        if(j - numbers[i] >= 0) {
            dp[i][j] += dp[i - 1][j - numbers[i]];
        }
    }
}

console.log(String(dp[N - 2][numbers[N - 1]]));
