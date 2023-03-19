const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});

rl.on('close', () => {
    let N = parseInt(input[0])
    let board = [];
    let colorWeakBoard = [];
    let colorWeakAnswer = 0;
    let answer = 0;

    for (let i = 1; i <= N; i++) {
        board.push(input[i].split(""));
        colorWeakBoard.push(input[i].split("").map((item) => item === "R" ? "G" : item));
    }

    const DFS = (i, j, color, board) => {
        let temp = [[i, j]];

        while (temp.length > 0) {
            let [curI, curJ] = temp.pop();
            board[curI][curJ] = '';

            if (curI + 1 < N && board[curI + 1][curJ] === color) {
                board[curI + 1][curJ] = 0;
                temp.push([curI + 1, curJ])
            }
            if (curJ + 1 < N && board[curI][curJ + 1] === color) {
                board[curI][curJ + 1] = 0;
                temp.push([curI, curJ + 1])
            }
            if (curI - 1 >= 0 && board[curI - 1][curJ] === color) {
                board[curI - 1][curJ] = 0;
                temp.push([curI - 1, curJ])
            }
            if (curJ - 1 >= 0 && board[curI][curJ - 1] === color) {
                board[curI][curJ - 1] = 0;
                temp.push([curI, curJ - 1])
            }
        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N ; j ++) {
            if (board[i][j] !== '') {
                DFS(i, j, board[i][j], board)
                answer++;
            }
        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N ; j ++) {
            if (colorWeakBoard[i][j] !== '') {
                DFS(i, j, colorWeakBoard[i][j], colorWeakBoard)
                colorWeakAnswer++;
            }
        }
    }
    console.log(answer, colorWeakAnswer)
    process.exit();
})