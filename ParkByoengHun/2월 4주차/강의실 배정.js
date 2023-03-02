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
    let arr = [];
    let obj = {};
    let now = 0;
    let answer = 0;
    for (let i = 1; i <= N; i++) {
        arr.push(input[i].split(" ").map(item => parseInt(item)));
    }
    arr.sort((a,b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

    for (const time of arr) {
        const [s, e] = time;
        s in obj ? obj[s] += 1 : obj[s] = 1;
        e in obj ? obj[e] -= 1 : obj[e] = -1;
    }

    for (const time of Object.values(obj)) {
        now += time;
        answer = Math.max(now, answer);
    }
    console.log(answer);
    process.exit();
})