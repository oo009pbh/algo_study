const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const numbers = input.flat(1);

// DP[i][j] := i번째까지 원소 중에서 최대공약수가 j가 되게 하는 원소들로 이루어진 공집합이 아닌 집합의 개수

const dp = Array.from({length: N + 1}, () => Array(100001).fill(0));

function gcd(a, b) {
    return b > 0 ? gcd(b, a % b) : a;
}

for(let i = 0; i < N; i++) {
    dp[i][numbers[i]] = 1;
}

for(let i = 1; i <= N; i++) {
    for(let j = 1; j <= 100000; j++) {
        dp[i][j] += dp[i - 1][j];
        dp[i][j] %= 10000003;

        const cop = gcd(numbers[i], j);
        dp[i][cop] += dp[i - 1][j];
        dp[i][cop] %= 10000003;
    }
}

console.log(dp[N - 1][1]);

