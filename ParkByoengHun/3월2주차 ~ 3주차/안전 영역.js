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
    let area = [];
    let answer = 1;
    let heights = new Set();
    for (let i = 1; i <= N; i++) {
        area.push(input[i].split(" ").map(item => parseInt(item)));
        area[i - 1].forEach(item => heights.add(item));
    }
    heights = [...heights];
    heights.sort((a, b) => a - b);
    const DFS = (i, j) => {
        let temp = [[i, j]];

        while (temp.length > 0) {
            let [curI , curJ] = temp.pop();
            if (curI + 1 < N && area[curI + 1][curJ] > 0) {
                area[curI + 1][curJ] = - area[curI + 1][curJ];
                temp.push([curI + 1, curJ])
            }
            if (curJ + 1 < N && area[curI][curJ + 1] > 0) {
                area[curI][curJ + 1] = - area[curI][curJ + 1];
                temp.push([curI, curJ + 1])
            }
            if (curI - 1 >= 0 && area[curI - 1][curJ] > 0) {
                area[curI - 1][curJ] = - area[curI - 1][curJ];
                temp.push([curI - 1, curJ])
            }
            if (curJ - 1 >= 0 && area[curI][curJ - 1] > 0) {
                area[curI][curJ - 1] = - area[curI][curJ - 1];
                temp.push([curI, curJ - 1])
            }
        }
    }

    for (let height of heights) {
        area = area.map(line => line.map(loc => loc <= height ? 0 : loc));
        let tempAnswer = 0;
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (area[i][j] > 0) {
                    area[i][j] = -area[i][j];
                    DFS(i, j);
                    tempAnswer++;
                }
            }
        }
        answer = answer > tempAnswer ? answer : tempAnswer;
        area = area.map(line => line.map(loc => Math.abs(loc)));
    }

    console.log(answer);
    process.exit();
})

