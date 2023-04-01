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
    let q = new Queue();
    let answer = -1;
    let maxCnt = 0;
    let area = [];

    let [M, N] = input[0].split(" ").map(item => parseInt(item));

    for (let i = 1; i <= N; i++) {
        area.push(input[i].split(" ").map(item => parseInt(item)));
        area[i - 1].forEach((item, j) => item === 1 && q.enqueue([i - 1, j, 0]));
    }

    while (q.size > 0){
        let [curI, curJ, cnt] = q.dequeue();
        maxCnt = Math.max(maxCnt, cnt);

        if (curI + 1 < N && area[curI + 1][curJ] === 0) {
            area[curI + 1][curJ] = cnt + 1;
            q.enqueue([curI + 1, curJ, cnt + 1]);
        }
        if (curI - 1 >= 0 && area[curI - 1][curJ] === 0) {
            area[curI - 1][curJ] = cnt + 1;
            q.enqueue([curI - 1, curJ, cnt + 1]);
        }
        if (curJ + 1 < M && area[curI][curJ + 1] === 0) {
            area[curI][curJ + 1] = cnt + 1;
            q.enqueue([curI, curJ + 1, cnt + 1]);
        }
        if (curJ - 1 >= 0 && area[curI][curJ - 1] === 0) {
            area[curI][curJ - 1] = cnt + 1;
            q.enqueue([curI, curJ - 1, cnt + 1]);
        }
    }

    if (area.flat(2).filter(filterItem => filterItem === 0).length === 0) {
        answer = maxCnt;
    }

    console.log(answer);
    process.exit();
})