const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

const [R, C] = input.shift().split(" ").map(Number);
const graph = input.map((el) => el.trimEnd().split(""));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const queueW = []; // 홍수 -> * & 돌 -> X
const queueJ = []; // 고슴도치 -> S
const endPoint = [];

for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
        if (graph[i][j] === "*") {
            queueW.push([i, j]);
        }
        if (graph[i][j] === "S") { // 고슴도치
            queueJ.push([i, j, 0]);
        }
        if (graph[i][j] === "D") { // 도착지
            endPoint.push(i);
            endPoint.push(j);
        }
    }
}

function waterBfs() {
    const queue = [];
    for(let [x, y] of queueW) {
        for(let i = 0; i < 4; i++) {
            const nextX = x + dx[i];
            const nextY = y + dy[i];

            if (nextX < 0 || nextX >= R || nextY < 0 || nextY >= C)
                continue;
            if(graph[nextX][nextY] !== ".")
                continue;

            graph[nextX][nextY] = "*";
            queue.push([nextX, nextY]);
        }
    }
    queueW.push(...queue);
}

function animalBfs() {
    const isVisited = Array.from({ length: R }, () => Array(C).fill(false));
    const [x, y] = queueJ[0];
    const [eX, eY] = endPoint;
    isVisited[x][y] = true;
    
    while(queueJ.length > 0) {
        waterBfs();

        for(let q = 0; q < queueJ.length; q++) {
            const [x, y, cnt] = queueJ.shift();

            if(x === eX && y === eY)
                return cnt;

            for(let i = 0; i < 4; i++) {
                const nextX = x + dx[i];
                const nextY = y + dy[i];

                if (nextX < 0 || nextX >= R || nextY < 0 || nextY >= C)
                    continue;
                // 이미 방문 했거나, 돌이거나
                if(isVisited[nextX][nextY] || graph[nextX][nextY] === "X" || graph[nextX][nextY] === "*")
                    continue;

                queueJ.push([nextX, nextY, cnt + 1]);
                isVisited[nextX][nextY] = true;
            }

        }
    }
    return -1;
}

const time = animalBfs();
console.log(time === -1 ? "KAKTUS" : time);