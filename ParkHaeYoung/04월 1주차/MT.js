// knapsack : 배낭 문제 -> 다이나믹 프로그래밍 (DP)

const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [n, k] = input.shift();
const choice = [0, ...input.shift()];

const visit = Array(n + 1).fill(false);

const cycle = [];
const notCycle = [];
const group = Array(n + 1).fill(0);

function dfs(v) {
    const cycleMember = [v];
    visit[v] = true;
    group[v] = cycle.length;

    while(true) {
        if(group[choice[v]] === -1)
            group[choice[v]] = group[v];
        else
            group[v] = group[choice[v]];

        v = choice[v];
        if(!visit[v]) {
            visit[v] = true;
            cycleMember.push(v);
        } else {
            if(cycleMember.includes(v)) {
                const cycleStartIdx = cycleMember.indexOf(v);
                cycle.push(cycleMember.length - cycleStartIdx);
                notCycle.push(cycleStartIdx);
                return;
            } else {
                notCycle[group[v]] += cycleMember.length;
                return;
            }
        }
    }
}

for (let i = 1; i <= n; i++) {
    if (!visit[i])
        dfs(i)
}

const cycleCnt = cycle.length;

const dp = Array.from({length: cycleCnt + 1}, () => Array(n + 1).fill(0));

for (let i = 1; i < cycleCnt + 1; i++) {
    const w = cycle[i - 1];
    const r = notCycle[i - 1];
    for (let j = 1; j < n + 1; j++) {
        if (w <= j) {
            dp[i][j] = w;
            if (w + r >= j) {
                dp[i][j] = j;
            }
            if (dp[i - 1][j - w] >= 0) {
                dp[i][j] = Math.max(dp[i - 1][j - w] + w, dp[i - 1][j], dp[i][j]);
            } else {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j]);
            }
        } else {
            dp[i][j] = Math.max(dp[i][j], dp[i - 1][j]);
        }
    }
}

let answer = 0;
for(let i = 1; i < n + 1; i++) {
    if(dp[cycleCnt][i] >= 0 && dp[cycleCnt][i] <= k)
        answer = Math.max(answer, dp[cycleCnt][i]);
}

console.log(answer);