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
    const [N, M] = input[0].split(' ').map(item => parseInt(item));
    const field = [];
    const isVisited = Array.from({ length: N }, () => Array.from({ length: M }, () => Array(2).fill(0)));
    const q = new Queue();

    let answer = -1;

    for (let i = 1; i <= N; i ++) {
        field.push(input[i].split('').map(item => parseInt(item)));
    }

    q.enqueue([0, 0, 1, 0]);
    isVisited[0][0][0] = 1;

    while (q.size > 0) {
        const [curI, curJ, cnt, isBreak] = q.dequeue();

        if (curI === N - 1 && curJ === M - 1) {
            answer = cnt;
            break ;
        }

        if (curI + 1 < N && !isVisited[curI + 1][curJ][isBreak]) {
            if (field[curI + 1][curJ] === 0) {
                isVisited[curI + 1][curJ][isBreak] = 1;
                q.enqueue([curI + 1, curJ, cnt + 1, isBreak]);
            } else if (field[curI + 1][curJ] === 1 && !isBreak) {
                isVisited[curI + 1][curJ][1] = 1;
                q.enqueue([curI + 1, curJ, cnt + 1, 1]);
            }
        }
        if (curJ + 1 < M && !isVisited[curI][curJ + 1][isBreak]) {
            if (field[curI][curJ + 1] === 0) {
                isVisited[curI][curJ + 1][isBreak] = 1;
                q.enqueue([curI,curJ + 1, cnt + 1, isBreak]);
            } else if (field[curI][curJ + 1] === 1 && !isBreak) {
                isVisited[curI][curJ + 1][1] = 1;
                q.enqueue([curI,curJ + 1, cnt + 1, 1]);
            }
        }
        if (curI - 1 >= 0 && !isVisited[curI - 1][curJ][isBreak]) {
            if (field[curI - 1][curJ] === 0) {
                isVisited[curI - 1][curJ][isBreak] = 1;
                q.enqueue([curI - 1, curJ, cnt + 1, isBreak]);
            } else if (field[curI - 1][curJ] === 1 && !isBreak) {
                isVisited[curI - 1][curJ][1] = 1;
                q.enqueue([curI - 1, curJ, cnt + 1, 1]);
            }
        }
        if (curJ - 1 >= 0 && !isVisited[curI][curJ - 1][isBreak]) {
            if (field[curI][curJ - 1] === 0) {
                isVisited[curI][curJ - 1][isBreak] = 1;
                q.enqueue([curI, curJ - 1, cnt + 1, isBreak]);
            } else if (field[curI][curJ - 1] === 1 && !isBreak) {
                isVisited[curI][curJ - 1][1] = 1;
                q.enqueue([curI, curJ - 1, cnt + 1, 1]);
            }
        }
    }

    console.log(answer);
    process.exit();
})

