// https://www.acmicpc.net/problem/2206
class Node {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.next = null;
    }
}
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    push(x, y, w) {
        let node = new Node(x, y, w);
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

const [N, M] = input.shift().split(" ").map(Number);
const graph = input.map((el) => el.trimEnd().split("").map(Number));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function bfs() {
    const isVisited = Array.from({ length: N }, () => Array.from({ length: M }, () => Array(2).fill(0)));
    const queue = new Queue();
    queue.push(0, 0, 0)
    isVisited[0][0][0] = 1;

    while(queue.length() > 0 ){
        const value = queue.shift();
        const [x, y, w] = [value.x, value.y, value.w];

        if(x === N - 1 && y === M - 1){
            return isVisited[x][y][w];
        }

        for(let i = 0; i < 4; i++) {
            const nextX = x + dx[i];
            const nextY = y + dy[i];

            if(0 > nextX || nextX >= N || 0 > nextY || nextY >= M)
                continue;

            if(graph[nextX][nextY] === 0 && !isVisited[nextX][nextY][w]) {
                isVisited[nextX][nextY][w] = isVisited[x][y][w] + 1;
                queue.push(nextX, nextY, w)
            } else if (graph[nextX][nextY] === 1 && w === 0) {
                isVisited[nextX][nextY][w + 1] = isVisited[x][y][w] + 1;
                queue.push(nextX, nextY, w + 1);
            }
        }
    }

    return -1;

}

const result = bfs();
console.log(result);