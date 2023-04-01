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
    let T = parseInt(input[0])
    let answers = [];
    let currentLine = 1;
    for (let i = 0; i < T; i ++) {
        const [M, N, K] = input[currentLine ++].split(" ").map(item => parseInt(item));
        const field = Array.from({ length: N }, () => Array(M).fill(0));
        let cnt = 0;

        for (let j = 0; j < K; j++) {
            const [X, Y] = input[currentLine ++].split(" ").map(item => parseInt(item));
            field[Y][X] = 1;
        }
        const DFS = (i, j) => {
            const temp = [[i, j]];

            while (temp.length > 0) {
                let [curI , curJ] = temp.pop();

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
        }

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (field[i][j] === 1) {
                    DFS(i, j);
                    cnt ++;
                }
            }
        }

        answers.push(cnt)
    }


    for (let answer of answers) {
        console.log(answer);
    }
    process.exit();
})

