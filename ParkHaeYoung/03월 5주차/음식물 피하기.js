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
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, K] = input.shift().split(" ").map(Number);
const points = input.map((el) => el.split(" ").map(Number));

const graph = Array.from({ length: N }, () => Array(M).fill(0));
const isVisited = Array.from({ length: N }, () => Array(M).fill(false));
points.forEach((point) => {
    const [x, y] = point;
    graph[x - 1][y - 1] = 1;
})

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function bfs(x, y) {
    const queue = new Queue();
    queue.push(x, y)
    isVisited[x][y] = true;

    let cnt = 1;
    while(queue.length() > 0 ){
        const value = queue.shift();
        const [x, y] = [value.x, value.y];

        for(let i = 0; i < 4; i++) {
            const newX = x + dx[i];
            const newY = y + dy[i];

            if(0 > newX || newX >= N || 0 > newY || newY >= M)
                continue;

            if(!isVisited[newX][newY] && graph[newX][newY] === 1) {
                cnt++;
                queue.push(newX, newY);
                isVisited[newX][newY] = true;
            }
        }
    }
    return cnt;
}

function solution() {
    let max = 0;
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < M; j++) {
            if(graph[i][j] === 1 && !isVisited[i][j]) {
                const cnt = bfs(i, j);
                max = Math.max(max, cnt);
            }
        }
    }
    return max;
}
const result = solution();

console.log(result);