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
    const [R, C] = input[0].split(" ").map(item => parseInt(item));
    const field = [];

    let answer = 0;

    for (let i = 1; i <= R; i ++) {
        field.push(input[i].split(""));
    }

    const visited = new Set([field[0][0]]);
    const DFS = (curI, curJ, cnt) => {
        answer = Math.max(cnt, answer);
        visited.add(field[curI][curJ]);
        if (curI + 1 < R && !visited.has(field[curI + 1][curJ]) ) {
            DFS(curI + 1, curJ, cnt + 1);
        }
        if (curJ + 1 < C && !visited.has(field[curI][curJ + 1]) ) {
            DFS(curI,curJ + 1, cnt + 1);
        }
        if (curI - 1 >= 0 && !visited.has(field[curI - 1][curJ])) {
            DFS(curI - 1, curJ, cnt + 1);
        }
        if (curJ - 1 >= 0 && !visited.has(field[curI][curJ - 1])) {
            DFS(curI,curJ - 1, cnt + 1);
        }
        visited.delete(field[curI][curJ]);
    }

    DFS(0, 0, 1);

    console.log(answer);
    process.exit();
})

