
const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [N] = input.shift();

const dp = new Array(N + 1).fill(0);
const route = new Array(N + 1).fill(0);

function solution() {
    for(let i = 2; i <= N; i++) {
        dp[i] = dp[i - 1] + 1;
        route[i] = i - 1;

        if(i % 2 === 0) {
            const target = i / 2;
            if(dp[i] > dp[target] + 1) {
                dp[i] = dp[target] + 1;
                route[i] = target;
            }
        }

        if(i % 3 === 0) {
            const target = i / 3;
            if(dp[i] > dp[target] + 1) {
                dp[i] = dp[target] + 1;
                route[i] = target;
            }
        }
    }
    return route[N];
}

let start = solution();
const result = [N];
while(start !== 0) {
    result.push(start);
    start = route[start];
}
console.log(result.length - 1);
console.log(result.join(" "))