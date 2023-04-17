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
    let water = new Queue();
    let [Swan1, Swan2] = [[], []];
    const [R, C] = input[0].split(" ").map(item => parseInt(item));

    let swanVisited = Array.from({ length: R }, () => Array(C).fill(false));
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];

    // 0 지나다닐 수 있음
    // N N초뒤에 지나다닐 수 있음
    for (let i = 1; i <= R; i++) {
        area.push(input[i].split(""));

        for (let j = 0 ; j < C; j ++) {
            if (area[i-1][j] === "X") {
                area[i-1][j] = 1501;
            } else if (area[i - 1][j] === "L") {
                area[i-1][j] = 0;
                water.enqueue([i-1, j]);
                if (Swan1.length > 0) Swan2 = [i - 1, j];
                else Swan1 = [i - 1, j];
            } else {
                water.enqueue([i-1, j]);
                area[i-1][j] = 0;
            }
        }
    }

    const meltIce = () => {
        const waterSize = water.size;

        for (let i = 0; i < waterSize; i ++) {
            let [curI, curJ] = water.dequeue();

            if (curI + 1 < R && area[curI + 1][curJ] === 1501) {
                area[curI + 1][curJ] = area[curI][curJ] + 1;
                water.enqueue([curI + 1, curJ]);
            }
            if (curI - 1 >= 0 && area[curI - 1][curJ] === 1501) {
                area[curI - 1][curJ] = area[curI][curJ] + 1;
                water.enqueue([curI - 1, curJ]);
            }
            if (curJ + 1 < C && area[curI][curJ + 1] === 1501) {
                area[curI][curJ + 1] = area[curI][curJ] + 1;
                water.enqueue([curI, curJ + 1]);
            }
            if (curJ - 1 >= 0 && area[curI][curJ - 1] === 1501) {
                area[curI][curJ - 1] = area[curI][curJ] + 1;
                water.enqueue([curI, curJ - 1]);
            }
        }
    }

    let q = new Queue();
    q.enqueue([...Swan1]);

    const BFS = () => {
        const nextQ = new Queue();
        swanVisited[Swan1[0]][Swan1[1]] = true;

        while (q.size > 0){
            const [curI, curJ] = q.dequeue();

            for (let i = 0; i < 4; i++) {
                const ni = curI + dy[i];
                const nj = curJ + dx[i];

                if (ni >= 0 && nj >= 0 && ni < R && nj < C && !swanVisited[ni][nj]) {
                    if (ni === Swan2[0] && nj === Swan2[1]) {
                        return true;
                    } else if (area[ni][nj] === 1501) {
                        nextQ.enqueue([ni, nj]);
                    } else {
                        q.enqueue([ni, nj]);
                    }
                    swanVisited[ni][nj] = true;
                }
            }
        }

        while (nextQ.size > 0) {
            q.enqueue([...nextQ.dequeue()]);
        }
        return false;
    }

    for (let i = 0; i <= 1500; i++) {
        const result = BFS(i);
        meltIce();
        if (result) {
            console.log(i);
            break;
        }
    }

    process.exit();
})