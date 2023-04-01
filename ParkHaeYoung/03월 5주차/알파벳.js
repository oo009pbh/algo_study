const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

const [R, C] = input.shift().split(" ").map(Number);
const graph = input.map((el) => el.trimEnd().split("").map((el) => {
    return el.charCodeAt(0) - 'A'.charCodeAt(0);
}));

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];


function solution() {
    let answer = 0;
    const isVisited = Array(26).fill(false);
    isVisited[graph[0][0]] = true;

    const dfs = (cX, cY, cnt) => {
        answer = Math.max(answer, cnt);

        for (let i = 0; i < 4; i++) {
            const nY = cY + dy[i];
            const nX = cX + dx[i];

            if (nX < 0 || nX >= R || nY < 0 || nY >= C)
                continue;
            if (!isVisited[graph[nX][nY]]) {
                isVisited[graph[nX][nY]] = true;
                dfs(nX, nY, cnt + 1);
                isVisited[graph[nX][nY]] = false

            }
        }
    }
    dfs(0, 0, 1)
    console.log(answer);
}

solution();