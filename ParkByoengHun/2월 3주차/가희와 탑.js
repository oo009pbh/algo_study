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
    let [N, a, b] = input[0].split(" ").map(item => parseInt(item))
    let answer = [];

    for (let i = 1; i < a; i++) {
        answer.push(i)
    }

    answer.push(Math.max(a, b))

    for (let i = b - 1; i > 0; i--) {
        answer.push(i)
    }

    if (answer.length > N) {
        console.log(-1);
    }
    else {
        let temp = answer[0] + ' ';
        for (let i = 0; i < N - answer.length; i++) {
            temp += "1 ";
        }
        for (let i = 1; i < answer.length; i++) {
            temp += answer[i] + " ";
        }
        console.log(temp);
    }
    process.exit();
})