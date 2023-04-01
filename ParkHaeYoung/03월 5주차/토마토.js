class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.next = null;
    }
}
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    push(x, y) {
        let node = new Node(x, y);
        if (this.size === 0) {
            this.head = node;
        } else {
            this.tail.next = node;
        }
        this.tail = node;
        this.size++;
    }

    shift() {
        let temp = this.head;
        if (this.size === 0) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        this.size--;
        return temp;
    }

    length() {
        return this.size;
    }
}


const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

const [M, N] = input.shift().split(" ").map(Number);
const graph = input.map((el) => el.trimEnd().split(" ").map(Number));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const queue = new Queue();
let result = 0;

function bfs() {
    while(queue.length() > 0) {
        const value = queue.shift();
        const [x, y] = [value.x, value.y];

        for(let i = 0; i < 4; i++) {
            const nextX = x + dx[i];
            const nextY = y + dy[i];

            if(0 > nextX || nextX >= N || 0 > nextY || nextY >= M)
                continue;
            if(graph[nextX][nextY] === 0) {
                graph[nextX][nextY] = graph[x][y] + 1;
                queue.push(nextX, nextY);
            }
        }
    }

}
for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
        if(graph[i][j] === 1)
            queue.push(i, j);
    }
}

 bfs();

for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
        if(graph[i][j] === 0) {
            console.log("-1");
            return;
        }
        if(result < graph[i][j]) {
            result = graph[i][j];
        }
    }
}
console.log(result - 1);