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

// 메모리 제한으로 js로는 풀수 없는 문제
rl.on('close', () => {
    const N = parseInt(input[0]);
    let area = [];
    let DP = Array.from({length: N}, (v, i) =>  Array.from({length: N}, (v, i) => [0, 0, 0]))
    for (let i = 1; i <= N; i++) {
        area.push(input[i].split(" ").map((item) => parseInt(item)));
    }

    // DP[i][j][0] = 가로로 놓여진 파이프수
    // DP[i][j][1] = 세로로 놓여진 파이프수
    // DP[i][j][2] = 대각선으로 놓여진 파이프수
    DP[0][1][0] = 1;

    for (let i = 0; i < N; i ++) {
        for (let j = 2; j < N; j ++) {
            if (area[i][j] !== 1) {
                // 가로
                DP[i][j][0] += DP[i][j - 1][0];
                DP[i][j][0] += DP[i][j - 1][2];

                // 세로
                if (i > 0) {
                    DP[i][j][1] += DP[i - 1][j][1];
                    DP[i][j][1] += DP[i - 1][j][2];
                }

                if (i > 0 && area[i][j - 1] !== 1 && area[i - 1][j] !== 1) {
                    // 대각선
                    DP[i][j][2] += DP[i - 1][j - 1][0];
                    DP[i][j][2] += DP[i - 1][j - 1][1];
                    DP[i][j][2] += DP[i - 1][j - 1][2];
                }
            }
        }
    }

    // console.log(util.inspect(DP, { depth: null }));

    console.log((DP[N - 1][N - 1]).reduce((prev, cur) => prev + cur, 0));
    process.exit();
})