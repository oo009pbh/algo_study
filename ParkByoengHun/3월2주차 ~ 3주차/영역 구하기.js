const readline = require("readline");
const util = require("util");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});

rl.on('close', () => {
    let [M, N, K] = input[0].split(" ").map(item => parseInt(item))
    let areas = [];
    let board = Array.from(Array(M), (v, i) => new Array(N).fill(1));

    for (let i = 1; i <= K; i++) {
        let [x1, y1, x2, y2] = input[i].split(" ").map(item => parseInt(item));

        y1 = M - y1;
        y2 = M - y2;

        for (let y = y2; y < y1; y ++) {
            for (let x = x1; x < x2; x ++) {
                board[y][x] = 0;
            }
        }

    }

    const DFS = (i, j) => {
        let temp = [[i, j]];
        let cnt = 0;

        while (temp.length > 0) {
            let [curI , curJ] = temp.pop();
            cnt++;
            if (curI + 1 < M && board[curI + 1][curJ] > 0) {
                board[curI + 1][curJ] = 0;
                temp.push([curI + 1, curJ])
            }
            if (curJ + 1 < N && board[curI][curJ + 1] > 0) {
                board[curI][curJ + 1] = 0;
                temp.push([curI, curJ + 1])
            }
            if (curI - 1 >= 0 && board[curI - 1][curJ] > 0) {
                board[curI - 1][curJ] = 0;
                temp.push([curI - 1, curJ])
            }
            if (curJ - 1 >= 0 && board[curI][curJ - 1] > 0) {
                board[curI][curJ - 1] = 0;
                temp.push([curI, curJ - 1])
            }
        }


        return cnt;
    }

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N ; j ++) {
            if (board[i][j] === 1) {
                board[i][j] = 0;
                areas.push(DFS(i, j));
            }
        }
    }

    console.log(areas.length);
    console.log(areas.sort((a, b) => a - b).join(" "));
    process.exit();
})

