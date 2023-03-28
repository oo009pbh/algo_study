const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [T] = input.shift();

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

function solution(input) {
    const answer = [];
    for(let r = 0; r < T; r++) {
        const [M, N, K] = input.shift();
        const isVisited = Array.from({ length: N }, () => Array(M).fill(false));
        const graph = Array.from({ length: N }, () => Array(M).fill(0));

        for(let i = 0; i < K; i++) {
            const [x, y] = input.shift();
            graph[y][x] = 1;
        }

        let cnt = 0;

        function dfs(x, y) {
            isVisited[x][y] = true;

            for(let i = 0; i < 4; i++) {
                const nextX = x + dx[i];
                const nextY = y + dy[i];

                if(nextX < 0 || nextX >= N || nextY < 0 || nextY >= M)
                    continue;

                if(!isVisited[nextX][nextY] && graph[nextX][nextY] === 1) {
                    dfs(nextX, nextY);
                }
            }
        }

        for(let i = 0; i < N; i++) {
            for(let j = 0; j < M; j++) {
                if(!isVisited[i][j] && graph[i][j] === 1) {
                    cnt++;
                    dfs(i, j);
                }
            }
        }

        answer.push(cnt);
    }
    return answer.join("\n")
}


const result = solution(input);
console.log(result)

