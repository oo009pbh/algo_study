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
    let T = parseInt(input[0]);
    let currentLine = 1;

    for (let t = 0; t < T; t++) {
        let N = parseInt(input[currentLine ++]);
        let board = [];

        for (let i = 0; i < 2; i ++) {
            board.push(input[currentLine ++].split(' ').map(item => parseInt(item)));
        }
        board.push(Array(N).fill(0));

        for (let i = 1; i < N; i ++) {
            for (let j = 0; j < 3; j ++) {
                let maxValue = 0;
                for (let k = 0; k < 3; k ++) {
                    if (j !== k) {
                        maxValue = Math.max(board[k][i - 1], maxValue);
                    }
                }
                board[j][i] += maxValue;
            }
        }

        console.log(Math.max(board[0][N - 1], board[1][N - 1], board[2][N - 1]));
    }

    process.exit();
})