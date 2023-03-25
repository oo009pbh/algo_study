// https://www.acmicpc.net/problem/4179
const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

const [R, C] = input.shift().split(" ").map(Number);
const graph = input.map((el) => el.trimEnd().split(""));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const fireMap = Array.from({ length: R }, () => Array(C).fill(0));
const queueF = [];
const queueJ = [];

for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
        if (graph[i][j] === "F") {
            queueF.push([i, j]);
            fireMap[i][j] = 1;
        }
        if (graph[i][j] === "J") {
            queueJ.push([i, j, 1]);
        }
    }
}

function fireBfs() {
    const isVisited = Array.from({ length: R }, () => Array(C).fill(false));
    while (queueF.length > 0) {
        const [x, y] = queueF.shift();
        for (let i = 0; i < 4; i++) {
            const nextX = x + dx[i];
            const nextY = y + dy[i];
            
            if (nextX < 0 || nextX >= R || nextY < 0 || nextY >= C)
                continue;
            if (graph[nextX][nextY] === "#" || fireMap[nextX][nextY] !== 0 || isVisited[nextX][nextY])
                continue;
            queueF.push([nextX, nextY]);
            fireMap[nextX][nextY] = fireMap[x][y] + 1;
            isVisited[nextX][nextY] = true;
        }
    }
}

function personBfs() {
    const isVisited = Array.from({ length: R }, () => Array(C).fill(false));
    const [x, y] = queueJ[0];
    isVisited[x][y] = true;

    while (queueJ.length > 0) {
        const [x, y, cnt] = queueJ.shift();

        for (let i = 0; i < 4; i++) {
            const nextX = x + dx[i];
            const nextY = y + dy[i];

            if (nextX < 0 || nextX >= R || nextY < 0 || nextY >= C)
                return cnt;
            if(fireMap[nextX][nextY] !== 0 && fireMap[nextX][nextY] <= cnt + 1)
                continue;
            if(isVisited[nextX][nextY])
                continue;
            if(graph[nextX][nextY] === "#")
                continue;

            queueJ.push([nextX, nextY, cnt + 1]);
            isVisited[nextX][nextY] = true;
        }
    }
    return -1;
}

fireBfs();
const time = personBfs();
console.log(time === -1 ? "IMPOSSIBLE" : time)
