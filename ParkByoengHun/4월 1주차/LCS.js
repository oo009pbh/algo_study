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
    const firstArray = input[0].split('');
    const secondArray = input[1].split('');
    const n = firstArray.length;
    const m = secondArray.length;
    const lcsArray = Array.from(Array(n + 1), () => new Array(m + 1).fill(0));
    for(let i = 0; i < n; i++) {
        const char = firstArray[i];
        for(let j = 0; j < m; j++) {
            if(char === secondArray[j]) {
                lcsArray[i + 1][j + 1] = lcsArray[i][j] + 1;
            } else {
                lcsArray[i + 1][j + 1] = Math.max(lcsArray[i][j + 1], lcsArray[i + 1][j]);
            }
        }
    }
    console.log(lcsArray[n][m]);
    process.exit();
})