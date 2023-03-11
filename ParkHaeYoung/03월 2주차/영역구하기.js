const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const [n, ...input] = fs.readFileSync(filePath).toString().trim().split("\n");
const graph = input.map((el) => el.split(" ").map(Number));
const [M, N, K] = n.split(" ").map(Number);

const result = solution(graph, M, N);
console.log(`${result.length}\n${result.join(" ")}`);

function solution(graph, M, N) {
    const area = [];

    const isVisited = Array.from({ length: M }, () => Array(N).fill(false));
    for(let i = 0; i < graph.length; i++) {
        const [x1, y1, x2, y2] = graph[i];
        for(let y = y1; y < y2; y++) {
            for(let x = x1; x < x2; x++){
                isVisited[y][x] = true;
            }
        }
    }
    const y = [0, 1, 0, -1];
    const x = [1, 0, -1, 0];

    let cnt = 0;
    const dfs = (cY, cX) => {
        isVisited[cY][cX] = true;

        for(let i = 0; i < 4; i++) {
            const nY = cY + y[i];
            const nX = cX + x[i];

            if(nX < 0 || nX >= N || nY < 0 || nY >= M)
                continue;

            if(!isVisited[nY][nX]) {
                cnt++;
                dfs(nY, nX);
            }
        }
    }
    for(let i = 0; i < M; i++) {
        for(let j = 0; j < N; j++) {
            if(!isVisited[i][j]) {
                cnt = 1;
                dfs(i, j);
                area.push(cnt);
            }
        }
    }

    return area.sort((a, b) => a - b);
}
