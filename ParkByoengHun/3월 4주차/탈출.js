const readline = require("readline");
const util = require('util');

class Node {
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    enqueue(data) {
        const newNode = new Node(data);
        if(this.isEmpty()) this.front = newNode;
        else this.rear.next = newNode;
        this.rear = newNode;
        this.size++;
    }

    dequeue() {
        if(this.isEmpty()) return;
        const data = this.front.data;
        this.front = this.front.next;
        this.size--;
        return data;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});
rl.on('close', () => {
    let area = [];
    const q = new Queue();
    let hedgehog = [0, 0];
    let goal = [0, 0];
    let waters = new Queue();
    let [R, C] = input[0].split(" ").map(item => parseInt(item));

    // 51 돌
    // 1 지나다닐 수 있음
    // -N N 분 이후 물이 차는 지점 ex) -2 2분뒤, 0 현재
    for (let i = 1; i <= R; i++) {
        area.push(input[i].split(""));

        for (let j = 0 ; j < C; j ++) {
            if (area[i-1][j] === "X") {
                area[i-1][j] = 51;
            } else if (area[i-1][j] === "*") {
                area[i-1][j] = 0;
                waters.enqueue([i-1, j]);
            } else if (area[i-1][j] === "S") {
                area[i-1][j] = 1;
                hedgehog = [i-1, j];
            } else if (area[i-1][j] === "D") {
                area[i-1][j] = 51;
                goal = [i-1, j];
            } else {
                area[i-1][j] = 1;
            }
        }
    }

    while (waters.size > 0){
        let [curI, curJ] = waters.dequeue();

        if (curI + 1 < R && area[curI + 1][curJ] !== 51 && area[curI + 1][curJ] === 1) {
            area[curI + 1][curJ] = area[curI][curJ] - 1;
            waters.enqueue([curI + 1, curJ]);
        }
        if (curI - 1 >= 0 && area[curI - 1][curJ] !== 51 && area[curI - 1][curJ] === 1) {
            area[curI - 1][curJ] = area[curI][curJ] - 1;
            waters.enqueue([curI - 1, curJ]);
        }
        if (curJ + 1 < C && area[curI][curJ + 1] !== 51 && area[curI][curJ + 1] === 1) {
            area[curI][curJ + 1] = area[curI][curJ] - 1;
            waters.enqueue([curI, curJ + 1]);
        }
        if (curJ - 1 >= 0 && area[curI][curJ - 1] !== 51 && area[curI][curJ - 1] === 1) {
            area[curI][curJ - 1] = area[curI][curJ] - 1;
            waters.enqueue([curI, curJ - 1]);
        }
    }

    area[hedgehog[0]][hedgehog[1]] = 51;
    area[goal[0]][goal[1]] = 1;
    q.enqueue([...hedgehog, 0]);

    while (q.size > 0) {
        const [curI, curJ, time] = q.dequeue();
        // console.log(util.inspect(area, { showHidden: true, depth: null }), time);

        if (curI === goal[0] && curJ === goal[1]) {
            console.log(time);
            q.enqueue([""]);
            break;
        }

        if (curI + 1 < R && area[curI + 1][curJ] !== 51 && (time + 1 + area[curI + 1][curJ] < 0 || area[curI + 1][curJ] === 1)) {
            q.enqueue([curI + 1, curJ, time + 1]);
            area[curI + 1][curJ] = 51;
        }
        if (curI - 1 >= 0 && area[curI - 1][curJ] !== 51 && (time + 1 + area[curI - 1][curJ] < 0 || area[curI - 1][curJ] === 1)) {
            q.enqueue([curI - 1, curJ, time + 1]);
            area[curI - 1][curJ] = 51;
        }
        if (curJ + 1 < C && area[curI][curJ + 1] !== 51 && (time + 1 + area[curI][curJ + 1] < 0 || area[curI][curJ + 1] === 1)) {
            q.enqueue([curI, curJ + 1, time + 1]);
            area[curI][curJ + 1] = 51;
        }
        if (curJ - 1 >= 0 && area[curI][curJ - 1] !== 51 && (time + 1 + area[curI][curJ - 1] < 0 || area[curI][curJ - 1] === 1)) {
            q.enqueue([curI, curJ - 1, time + 1]);
            area[curI][curJ - 1] = 51;
        }
    }

    if (q.size === 0) {
        console.log("KAKTUS");
    }
    process.exit();
})