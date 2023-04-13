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
    let X = parseInt(input[0]);
    let answer = 0;
    let history = "";
    const q = new Queue();
    q.enqueue([X, 0, String(X)])
    const cache = new Set([X]);

    while (q.size > 0) {
        let [cur, cnt, hist] = q.dequeue();

        if (cur === 1) {
            answer = cnt;
            history = hist;
            break;
        }

        if (cur % 3 === 0 && !cache.has(cur / 3)) {
            cache.add(cur / 3);
            q.enqueue([cur / 3, cnt + 1, hist + " " + String(cur / 3)])
        }
        if (cur % 2 === 0 && !cache.has(cur / 2)) {
            cache.add(cur / 2);
            q.enqueue([cur / 2, cnt + 1, hist + " " + String(cur / 2)])
        }
        if (!cache.has(cur - 1)) {
            cache.add(cur - 1);
            q.enqueue([cur - 1, cnt + 1, hist + " " + String(cur - 1)])
        }
    }

    console.log(answer);
    console.log(history);
    process.exit();
})