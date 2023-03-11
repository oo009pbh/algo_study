const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const [n, ...input] = fs.readFileSync(filePath).toString().trim().split("\n");
const graph = input.map((el) => el.split(" ").map(Number));

// 플로이드 와샬 알고리즘
// 모든 정점에서 모든 정점으로의 최단거리를 구하는 알고리즘

solution(graph, Number(n));
graph.forEach((el) => {
    console.log(el.join(" "));
})

function solution(graph, N) {
    for(let k = 0; k < N; k++) {
        for(let i = 0; i < N; i++) {
            for(let j = 0; j < N; j++) {
                if(graph[i][k] === 1 && graph[k][j] === 1) {
                    graph[i][j] = 1;
                }
            }
        }
    }
}