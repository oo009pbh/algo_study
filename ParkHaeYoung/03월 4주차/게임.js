// https://www.acmicpc.net/problem/1103
const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

const [N, M] = input.shift().split(" ").map(Number);
const graph = input.map((el) => el.split(""));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function isValidPoint(x, y) {
    return x >= 0 && y >= 0 && x < N && y < M && graph[x][y] !== "H"
}

const dp = Array.from(Array(N), () => Array(M).fill(-1));
dp[0][0] = 1;
const visited = Array.from(Array(N), () => Array(M).fill(false));
visited[0][0] = true;

let answer = 1;

const dfs = (x, y, visited) => {
    const cnt = dp[x][y];
    const value = graph[x][y];

    for (let i = 0; i < 4; i++) {
        const nx = x + value * dx[i];
        const ny = y + value * dy[i];

        if (isValidPoint(nx, ny)) {
            if (visited[nx][ny]) {
                console.log(-1);
                process.exit();
            }
            if (dp[nx][ny] < cnt + 1) {
                if (answer < cnt + 1) answer = cnt + 1;
                dp[nx][ny] = cnt + 1;
                visited[nx][ny] = true;
                dfs(nx, ny, visited);
                visited[nx][ny] = false;
            }
        }
    }
};

dfs(0, 0, visited);
console.log(answer);