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
    let [a, b, c, d] = input[0].split(" ").map(item => parseInt(item));
    let q = new Queue();
    let visited = new Set();
    let answer = -1;

    q.enqueue([0, 0, 0]);
    visited.add("0 0");

    while (q.size > 0) {
        const [aBowl, bBowl, cnt] = q.dequeue();

        if (aBowl === c && bBowl === d) {
            answer = cnt;
            break;
        }

        // a물통에 물이 차있을때 비우기
        if (aBowl > 0) {
            const temp = [0, bBowl];

            if (!visited.has(temp.join(" "))) {
                visited.add(temp.join(" "));
                q.enqueue([...temp, cnt + 1]);
            }
        }
        // a물통에 물이 용량보다 적을때 채우기
        if (aBowl < a) {
            const temp = [a, bBowl];
            if (!visited.has([a, bBowl])) {
                visited.add(temp.join(" "));
                q.enqueue([...temp, cnt + 1]);
            }
        }
        // b물통에 물이 용량보다 덜 차있을때 a물통에서 옮기기
        if (aBowl > 0 && bBowl < b) {
            const temp = aBowl + bBowl > b ? [aBowl + bBowl - b, b] : [0, aBowl + bBowl]

            if (!visited.has(temp.join(" "))) {
                visited.add(temp.join(" "));
                q.enqueue([...temp, cnt + 1]);
            }
        }

        // b물통에 물이 차있을때 비우기
        if (bBowl > 0) {
            const temp = [aBowl, 0];
            if (!visited.has(temp.join(" "))) {
                visited.add(temp.join(" "));
                q.enqueue([aBowl, 0, cnt + 1]);
            }
        }
        // b물통에 물이 용량보다 적을때 채우기
        if (bBowl < b) {
            const temp = [aBowl, b];
            if (!visited.has(temp.join(" "))) {
                visited.add(temp.join(" "));
                q.enqueue([aBowl, b, cnt + 1]);
            }
        }
        // a물통에 물이 용량보다 덜 차있을때 b물통에서 옮기기
        if (bBowl > 0 && aBowl < a) {
            const temp = aBowl + bBowl > a ? [a, aBowl + bBowl - a] : [aBowl + bBowl, 0]
            if (!visited.has(temp.join(" "))) {
                visited.add(temp.join(" "));
                q.enqueue([...temp, cnt + 1]);
            }
        }
    }

    console.log(answer);
    process.exit();
})