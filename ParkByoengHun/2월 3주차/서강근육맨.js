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
    let N = parseInt(input[0]);
    let MLoses = input[1].split(" ").map(muscleLose => BigInt(muscleLose));
    MLoses.sort((a, b) => a < b ? -1 : 1);

    let minM = 0;
    if (N % 2 === 1) {
        minM = MLoses.pop();
    }

    for (let i = 0 ; i < (MLoses.length / 2); i ++) {
        minM = MLoses[i] + MLoses[MLoses.length - i - 1] > minM ? MLoses[i] + MLoses[MLoses.length - i - 1] : minM;
    }

    console.log(String(minM));
    process.exit();
})