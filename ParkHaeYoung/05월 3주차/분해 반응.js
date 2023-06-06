const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [N, M] = input.shift();

const dp = Array.from({length: 151}, () => Array(151).fill(Infinity));
const adj = Array.from({length: 151}, () => []);

for (let i = 0; i < input.length; i++) {
    const [x, y] = input[i];
    adj[x].push(y);
    adj[y].push(x);
}

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

let answer = Infinity;

function calculate(h, p) {
    dp[h][1] = 0;

    for (let i = 0; i < adj[h].length; i++) {
        if (adj[h][i] === p) continue;
        calculate(adj[h][i], h);
        for (let j = N; j > 0; j--) {
            dp[h][j]++;
            for (let k = 1; k < j; k++) {
                dp[h][j] = Math.min(dp[h][j], dp[h][k] + dp[adj[h][i]][j - k]);
            }
        }
    }
    answer = Math.min(answer, dp[h][M] + 1 - factorial(p));
}

calculate(1, 0);
console.log(answer);


