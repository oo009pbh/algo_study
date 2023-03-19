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
    let [N, C] = input[0].split(" ").map(item => parseInt(item));
    let infoCnt = parseInt(input[1]);
    let villages = Array.from({ length: N + 1 }, () => 0);
    let infos = [];
    let answer = 0;

    for (let i = 2; i < infoCnt + 2; i++) {
        infos.push(input[i].split(" ").map(item => parseInt(item)));
    }

    infos.sort((prev, next) => prev[1] - next[1]);

    for (let [from, to, boxes] of infos) {

        //현재 택배가 지나가야할 truck배열값중 가장큰거
        let maxTruck= 0;
        //가져갈수있는 택배수 구하기위한 변수 (원래 택배수,가능한공간)
        for (let i = from; i < to; i++){
            maxTruck = Math.max(villages[i], maxTruck);
        }
        let capacity = Math.min(boxes,C - maxTruck);
        for (let i = from; i < to; i++) {
            villages[i] += capacity;
        }
        answer += capacity; //트럭에 성공적으로 싣은 택배
    }

    console.log(answer);
    process.exit();
})

