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
    let N = input[0];
    let arr = input.slice(1);
    let answer = [];
    arr = arr.map(line => [...line].map(item => parseInt(item)));
    for (let i = 0 ; i < N ; i++) {
        for (let j = 0 ; j < N ; j++) {
            if (arr[i][j] === 1) {
                answer.push(DFS(arr, N, [i, j]));
            }
        }
    }
    answer.sort((function(a, b)  {
        return a - b;
    }));
    console.log(answer.length);
    for (let item of answer) {
        console.log(item);
    }
    process.exit();
})

const DFS = (arr, N, startNode) => {
    let needVisit = [];
    let answer = 0
    needVisit.push(startNode);

    while (needVisit.length !== 0) {
        const [i, j] = needVisit.pop();
        if (arr[i][j] === 1) {
            answer += 1;
            arr[i][j] = 0;
            if (i + 1 < N && arr[i + 1][j] === 1) {
                needVisit.push([i + 1, j]);
            }
            if (i - 1 >= 0 && arr[i - 1][j] === 1) {
                needVisit.push([i - 1, j]);
            }
            if (j + 1 < N && arr[i][j + 1] === 1) {
                needVisit.push([i, j + 1]);
            }
            if (j - 1 >= 0 && arr[i][j - 1] === 1) {
                needVisit.push([i, j - 1]);
            }
        }
    }
    return answer;
};