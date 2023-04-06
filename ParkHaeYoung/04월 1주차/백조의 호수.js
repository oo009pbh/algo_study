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

const [R, C] = input.shift().split(" ").map(Number);
const lake = input.map((el) => el.trim().split(""));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function solution() {
    const waterQueue = new Queue();
    const swanQueue = new Queue();
    const isVisited = Array.from(Array(R), () => Array(C).fill(false));
    const swan = [];

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (lake[i][j] === '.') {
                // 물 위치 추가
                waterQueue.push(i, j);
            } else if (lake[i][j] === 'L') {
                // 백조 위치 추가 + 물 위치로 변환
                swan.push([i, j])
                lake[i][j] = '.'
                waterQueue.push(i, j);
            }
        }
    }
    // 결과 값
    let days = 0;
    // 백조 2마리 좌표
    const [sx, sy] = swan[0];
    const [ex, ey] = swan[1];
    swanQueue.push(sx, sy);
    isVisited[sx][sy] = true;

    // 다음 턴에 확인해야하는 백조의 이동 범위
    const swanTemp = [];

    while (true) {
        while (swanQueue.length() > 0) {
            const value = swanQueue.shift();
            const [x, y] = [value.x, value.y];
            for (let i = 0; i < 4; i++) {
                const nextX = x + dx[i];
                const nextY = y + dy[i];

                if (nextX === ex && nextY === ey) {
                    return days;
                } else if (nextX >= 0 && nextX < R && nextY >= 0 && nextY < C && !isVisited[nextX][nextY]) {
                    if (lake[nextX][nextY] === '.') {
                        swanQueue.push(nextX, nextY);
                    } else {
                        swanTemp.push([nextX, nextY]);
                    }
                    isVisited[nextX][nextY] = true;
                }
            }
        }

        while (swanTemp.length > 0) {
            const [x, y] = swanTemp.shift();
            swanQueue.push(x, y);
        }

        // 현재 물을 퍼뜨리는 로직 -> 물 주변의 얼음이 모두 물이 된다.
        const waterLength = waterQueue.length();
        for(let i = 0; i < waterLength; i++) {
            const value = waterQueue.shift();
            const [x, y] = [value.x, value.y];

            for (let i = 0; i < 4; i++) {
                const nextX = x + dx[i];
                const nextY = y + dy[i];
                if (nextX >= 0 && nextX < R && nextY >= 0 && nextY < C && lake[nextX][nextY] === "X") {
                    waterQueue.push(nextX, nextY);
                    lake[nextX][nextY] = '.';
                }
            }
        }
        days++;
    }
}

const result = solution();
console.log(result);

