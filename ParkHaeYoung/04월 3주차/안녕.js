const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const power = input.shift();
const joy = input.shift();

const dp = Array.from({length: N + 1 }, () => Array(101).fill(0));

// i 번째 사람을 만났을 때
for(let i = 1; i < N + 1; i++) {
    // j 번째 체력을 소모하면
    for(let j = 1; j <= 100; j++) {
        // 현재 i 번째 사람을 만나서 체력을 소모할 수 있다면
        if(power[i - 1] <= j) {
            // 이전 사람을 만났을 때의 '기쁨' VS 현재 사람을 만나서 체력을 소모하고, '기쁨'을 얻음
            dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - power[i - 1]] + joy[i - 1]);
        } else {
            dp[i][j] = dp[i - 1][j];
        }
    }
}

console.log(dp[N][99]);

