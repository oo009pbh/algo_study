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
    let [N, K] = input[0].split(" ").map(item => parseInt(item));
    const q = new Queue();
    let visited = new Array(100001).fill(false);

    q.enqueue([N, N.toString()]);

    while (q.size > 0) {
        const [cur, history] = q.dequeue();
        visited[cur] = true;

        if (cur === K) {
            console.log(history.split(" ").length - 1);
            console.log(history);
            break
        }

        if (cur > 1 && cur * 2 <= 100000 && !visited[cur * 2]) {
            q.enqueue([cur * 2, history + " " + (cur * 2).toString()]);
        }
        if (cur + 1 <= 100000 && !visited[cur + 1]) {
            q.enqueue([cur + 1, history + " " + (cur + 1).toString()]);
        }
        if (cur - 1 >= 0 && !visited[cur - 1]) {
            q.enqueue([cur - 1, history + " " + (cur - 1).toString()]);
        }
    }

    process.exit();
})