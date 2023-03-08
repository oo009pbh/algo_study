const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const [n, ...input] = fs.readFileSync(filePath).toString().trim().split("\n");

const result = solution(input, Number(n));
result.forEach((el) => console.log(el))


function solution(graph, N) {
    const answer = [];
    const isVisited = Array.from({ length: N }, () => Array(N).fill(false));

    const y = [0, 1, 0, -1];
    const x = [1, 0, -1, 0];

    let cnt = 0;
    const dfs = (cY, cX) => {
        isVisited[cY][cX] = true;

        for(let i = 0; i < 4; i++) {
            const nY = cY + y[i];
            const nX = cX + x[i];

            if(nX < 0 || nX >= N || nY < 0 || nY >= N)
                continue;

            if(!isVisited[nY][nX] && graph[nY][nX] === '1') {
                cnt++;
                dfs(nY, nX);
            }
        }
    }
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            if(!isVisited[i][j] && graph[i][j] === '1') {
                cnt = 1;
                dfs(i, j);
                answer.push(cnt);
            }
        }
    }

    const total = answer.length;
    return [total, ...answer.sort((a, b) => a - b)];
}