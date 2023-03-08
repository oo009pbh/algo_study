const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const [n, ...input] = fs.readFileSync(filePath).toString().trim().split("\n");

const y = [0, 1, 0, -1];
const x = [1, 0, -1, 0];

const solution = (graph, N) => {
    const isVisited = Array.from({ length: N }, () => Array(N).fill(false));
    const isVisited2 = Array.from({ length: N }, () => Array(N).fill(false));

    const dfs = (cY, cX) => {
        isVisited[cY][cX] = true;

        for(let i = 0; i < 4; i++) {
            const nY = cY + y[i];
            const nX = cX + x[i];

            if(nX < 0 || nX >= N || nY < 0 || nY >= N)
                continue;

            if(graph[nY][nX] === graph[cY][cX] && !isVisited[nY][nX]) {
                dfs(nY, nX);
            }
        }
    }

    const dfs2 = (cY, cX) => {
        isVisited2[cY][cX] = true;

        for(let i = 0; i < 4; i++) {
            const nY = cY + y[i];
            const nX = cX + x[i];

            if(nX < 0 || nX >= N || nY < 0 || nY >= N)
                continue;

            const isSameColor = (graph[nY][nX] === 'R' && graph[cY][cX] === 'G') ||(graph[nY][nX] === 'G' && graph[cY][cX] === 'R');
            if((isSameColor || graph[nY][nX] === graph[cY][cX]) && !isVisited2[nY][nX]) {
                dfs2(nY, nX);
            }
        }
    }

    let count = 0;
    let count2 = 0;
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            if(!isVisited[i][j]) {
                count++;
                dfs(i, j);
            }
            if(!isVisited2[i][j]) {
                count2++;
                dfs2(i, j);
            }
        }
    }

    return `${count} ${count2}`;
}

const result = solution(input, Number(n));
console.log(result)