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
    let answer = 0;
    let N = parseInt(input[0])
    let K = parseInt(input[1])
    let distances = [];
    for (let distance of input[2].split(" ").map(item => parseInt(item)) ) {
        distances.push(distance);
    }

    distances.sort((a, b) => a - b);

    let arr = [];
    for (let i = 1; i < N; i++) {
        const gap = distances[i] - distances[i - 1];
        arr.push([i - 1, gap]);
    }

    let censorDistance = [...arr]
        .sort((a, b) => b[1] - a[1])
        .slice(0, K - 1)
        .sort((a, b) => a[0] - b[0]);
    censorDistance.push([N - 1, 0]);

    let index = 0;
    let start = 0;
    while (index < censorDistance.length) {
        const [end, _] = censorDistance[index++];
        for (let i = start; i < end; i++) {
            answer += arr[i][1];
        }
        start = end + 1;
    }

    console.log(answer);
    process.exit();
})