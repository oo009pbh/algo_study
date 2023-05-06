const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [N] = input.shift();

// list 로 선언 시, '메모리 초과' 이슈 발생 -> object 형태로 변경
const edges = {};
for(let i = 0; i < input.length; i++) {
    const [u, v] = input[i];
    if(u in edges) edges[u].push(v);
    else edges[u] = [v];
    if(v in edges) edges[v].push(u);
    else edges[v] = [u];
}


// 각 노드가 '얼리 어답터' 이거나, '일반인' 이거나
// dp[node][0] : '일반인'일 때, 본인 노드 + 해당 노드의 모든 자식 노드 중 문제 조건을 만족하는 최소 얼리 어답터 수
// dp[node][1] : '얼리 어답터'일 때, 본인 노드 + 해당 노드의 모든 자식 노드 중 문제 조건을 만족하는 최소 얼리 어답터 수

// -> dp[node][0] += dp[child][1];
// -> dp[node][1] += Math.min(dp[child][1], dp[child][0]);
const dp = Array.from({length: N + 1 }, () => [0, 1]);
const isVisited = Array(N + 1).fill(false);

function dfs(node) {
    isVisited[node] = true;
    dp[node][0] = 0;
    dp[node][1] = 1;

    for(let i = 0; i < edges[node].length; i++) {
        const connect = edges[node][i];
        if(isVisited[connect]) continue;
        dfs(connect);
        dp[node][0] += dp[connect][1];
        dp[node][1] += Math.min(dp[connect][0], dp[connect][1]);
    }
}

dfs(1);

console.log(Math.min(dp[1][0], dp[1][1]));