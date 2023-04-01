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
    const [N, M, K] = input[0].split(" ").map(item => parseInt(item));
    const field = Array.from({ length: N }, () => Array(M).fill(0));
    let answer = 0;

    for (let i = 1; i <= K; i ++) {
        const [curI, curJ] = input[i].split(" ").map(item => parseInt(item));

        field[curI - 1][curJ - 1] = 1;
    }
    const DFS = (i, j) => {
        const temp = [[i, j]];
        field[i][j] = 0;
        let cnt = 0;

        while (temp.length > 0) {
            let [curI , curJ] = temp.pop();
            cnt ++;

            if (curI + 1 < N && field[curI + 1][curJ] === 1) {
                field[curI + 1][curJ] = 0;
                temp.push([curI + 1, curJ])
            }
            if (curJ + 1 < M && field[curI][curJ + 1] === 1) {
                field[curI][curJ + 1] = 0;
                temp.push([curI, curJ + 1])
            }
            if (curI - 1 >= 0 && field[curI - 1][curJ] === 1) {
                field[curI - 1][curJ] = 0;
                temp.push([curI - 1, curJ])
            }
            if (curJ - 1 >= 0 && field[curI][curJ - 1] === 1) {
                field[curI][curJ - 1] = 0;
                temp.push([curI, curJ - 1])
            }
        }

        return cnt;
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (field[i][j] === 1) {
                answer = Math.max(answer, DFS(i, j));
            }
        }
    }

    console.log(answer);
    process.exit();
})

