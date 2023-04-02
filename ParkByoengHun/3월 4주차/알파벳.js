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

    let visited = Array.from(Array(R), (v, i) => new Array(C).fill(false));
    let visitedChar = {};

    for (let i = 1; i <= R; i ++) {
        field.push(input[i].split(""));
    }

    for (let i = 65; i < 91; i++ ){
        visitedChar[String.fromCharCode(i)] = 0;
    }

    const BFS = (i, j) => {
        const q = new Queue();
        q.enqueue([i, j, 1]);
        visited[i][j] = true;

        while (q.size > 0) {
            let [curI, curJ, cnt] = q.dequeue();
            visitedChar[field[curI][curJ]] += 1;
            answer = Math.max(cnt, answer);
            console.log(curI, curJ, field, visitedChar);

            let prevSize = q.size;

            if (curI + 1 < R && !visited[field[curI + 1][curJ]] && visitedChar[field[curI + 1][curJ]] === 0) {
                visited[field[curI + 1][curJ]] = true;
                q.enqueue([curI + 1, curJ, cnt + 1]);
            }
            if (curJ + 1 < C && !visited[field[curI][curJ + 1]] && visitedChar[field[curI][curJ + 1]] === 0) {
                visited[field[curI][curJ + 1]] = true;
                q.enqueue([curI, curJ + 1, cnt + 1]);
            }
            if (curI - 1 >= 0 && !visited[field[curI - 1][curJ]] && visitedChar[field[curI - 1][curJ]] === 0) {
                visited[field[curI - 1][curJ]] = true;
                q.enqueue([curI - 1, curJ, cnt + 1]);
            }
            if (curJ - 1 >= 0 && !visited[field[curI][curJ - 1]] && visitedChar[field[curI][curJ - 1]] === 0) {
                visited[field[curI][curJ - 1]] = true;
                q.enqueue([curI, curJ - 1, cnt + 1]);
            }

            if (prevSize === q.size) {
                visitedChar[field[curI][curJ]] -= 1;
                visited[field[curI][curJ]] = false;
            }
        }
    }

    BFS(0, 0);

    console.log(answer);
    process.exit();
})

