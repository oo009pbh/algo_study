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
    const [N, Damaged, Surplus] = input[0].split(" ").map(total => parseInt(total));
    let ships = new Array(N + 1).fill(1);
    let answer = 0;
    for (let d of input[1].split(" ").map(damaged => parseInt(damaged))) {
        ships[d] -= 1;
    }
    for (let s of input[2].split(" ").map(surplus => parseInt(surplus))) {
        ships[s] += 1;
    }

    for (let i = 1; i <= N; i ++) {
        if (ships[i] === 0) {
            if (i > 1 && ships[i - 1] === 2) {
                ships[i - 1] = 1;
                ships[i] = 1;
            } else if (i + 1 <= N && ships[i + 1] === 2) {
                ships[i + 1] = 1;
                ships[i] = 1;
            } else {
                answer += 1;
            }
        }
    }
    console.log(answer);
    process.exit();
})