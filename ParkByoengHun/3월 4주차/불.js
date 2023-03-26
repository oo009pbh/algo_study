const readline = require("readline");

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
    let jihoon = [0, 0];
    let fires = [];
    let [R, C] = input[0].split(" ").map(item => parseInt(item));

    // -1001 지나다닐 수 있음
    // 1 벽
    // 0 불이 일어난 지점
    // -N N분 이후 불이 일어날 지점
    for (let i = 1; i <= R; i++) {
        area.push(input[i].split(""));

        for (let j = 0 ; j < C; j ++) {
            if (area[i-1][j] === "#") {
                area[i-1][j] = 1;
            } else if (area[i-1][j] === "F") {
                area[i-1][j] = 0;
                fires.push([i-1, j]);
            } else if (area[i-1][j] === "J") {
                area[i-1][j] = -1001;
                jihoon = [i-1, j];
            } else {
                area[i-1][j] = -1001;
            }
        }
    }

    q.enqueue([jihoon, 0]);

    for (let fire of fires) {
        let [curI, curJ] = fire;

        for (let i = 1; curI + i < R && area[curI + i][curJ] !== 1; i ++) {
            area[curI + i][curJ] = Math.max(area[curI + i][curJ] , -i);
        }
        for (let i = 1; curI - i >= 0 && area[curI - i][curJ] !== 1; i ++) {
            area[curI - i][curJ] = Math.max(area[curI - i][curJ] , -i);
        }
        for (let j = 1; curJ + j < C && area[curI][curJ + j] !== 1; j ++) {
            area[curI][curJ + j] = Math.max(area[curI][curJ + j] , -j);
        }
        for (let j = 1; curJ - j >= 0 && area[curI][curJ - j] !== 1; j ++) {
            area[curI][curJ - j] = Math.max(area[curI][curJ - j] , -j);
        }
    }

    while (q.size > 0) {
        const [[curI, curJ], time] = q.dequeue();
        area[curI][curJ] = 1;

        if (curI + 1 >= R || curJ + 1 >= C || curI - 1 < 0 || curJ - 1 < 0) {
            console.log(time + 1);
            q.enqueue([""]);
            break;
        }

        if (curI + 1 < R && area[curI + 1][curJ] !== 1 && area[curI + 1][curJ] + time < 0) {
            q.enqueue([[curI + 1, curJ], time + 1]);
        }
        if (curI - 1 >= 0 && area[curI - 1][curJ] !== 1 && time + area[curI - 1][curJ] < 0) {
            q.enqueue([[curI - 1, curJ], time + 1]);
        }
        if (curJ + 1 < C && area[curI][curJ + 1] !== 1 && time + area[curI][curJ + 1] < 0) {
            q.enqueue([[curI, curJ + 1], time + 1]);
        }
        if (curJ - 1 >= 0 && area[curI][curJ - 1] !== 1 && time + area[curI][curJ - 1] < 0) {
            q.enqueue([[curI, curJ - 1], time + 1]);
        }
    }

    if (q.size === 0) {
        console.log("IMPOSSIBLE");
    }
    process.exit();
})