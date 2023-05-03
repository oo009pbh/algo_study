const readline = require("readline");
const util = require('util');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});

// 메모리 제한으로 js로는 풀수 없는 문제
rl.on('close', () => {
    const N = parseInt(input[0])
    const DP = Array.from({ length: N + 1 }, () => [0, 1]);
    const graph = {};
    const visited = Array.from({ length: N + 1 }, () => false);

    // 내가 얼리어답터일때 배열 인덱스 1
    // 아닐때 배열 인덱스 0
    for (let i = 1; i < N; i ++) {
        const [from, to] = input[i].split(' ').map(item => parseInt(item));
        if (from in graph) graph[from].push(to);
        else graph[from] = [to];

        if (to in graph) graph[to].push(from);
        else graph[to] = [from];
    }
    const DFS = (nextNode) => {
        visited[nextNode] = true;

        for (let i = 0; i < graph[nextNode].length; i ++) {
            const childNode = graph[nextNode][i];
            if (visited[childNode]) continue;
            DFS(childNode);

            DP[nextNode][0] += DP[childNode][1];
            DP[nextNode][1] += Math.min(DP[childNode][0], DP[childNode][1]);
        }
    }

    DFS(1);

    console.log(Math.min(DP[1][0], DP[1][1]));
    process.exit();
})