const readline = require("readline");
const util = require('util');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});
rl.on('close', () => {
    let N = parseInt(input[0]);
    let board = [];
    let blankCnt = [0, 0];

    for (let i = 1; i <= 2; i ++) {
        let array = input[i].split(' ').map(item => parseInt(item)).filter(filterItem => filterItem !== 0)
        blankCnt[i - 1] = N - array.length;
        array = array.concat(new Array(blankCnt[i - 1]).fill(0))
        board.push(array);
    }
    const maxBlankCnt = Math.max(...blankCnt);
    let DP = Array.from({ length: N }, (v, i) => Array.from({ length: blankCnt[0] + 1 }, () => Array(blankCnt[1] + 1).fill(0)));
    let area = Array.from({ length: 2 }, (v, i) => Array.from({ length: N }, () => Array(blankCnt[i] + 1).fill(0)));

    for (let i = 0; i < N; i ++) {
        for (let j = 0; j <= maxBlankCnt; j ++) {
            if (i + j < N && j < blankCnt[0] + 1) {
                area[0][i + j][j] = board[0][i];
            }
            if (i + j < N && j < blankCnt[1] + 1) {
                area[1][i + j][j] = board[1][i];
            }
        }
        console.log(area);

        for (let j = 0; j < blankCnt[0] + 1; j ++) {
            for (let k = 0; k < blankCnt[1] + 1; k ++) {
                DP[i][j][k] = area[0][i][j] * area[1][i][k];
            }
        }
    }

    for (let i = 1; i < N; i ++) {
        for (let j = 0; j < blankCnt[0] + 1; j ++) {

            for (let k = 0; k < blankCnt[1] + 1; k ++) {
                DP[i][j][k] += DP[i - 1][j].filter((item, index) => index <= k).reduce((prev, cur) => prev > cur ? prev : cur, -10);
            }
        }
    }

    process.exit();
})