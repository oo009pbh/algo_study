const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const [N, K] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number);


function bfs() {
    const queue = [N];
    const route = {[N] : N};
    const isVisited = {[N] : 1}

    while(queue.length > 0) {
        const x = queue.shift();

        if(x === K) {
            const result = [x];
            let idx = x;
            while(route[idx] !== N) {
                result.push(route[idx]);
                idx = route[idx];
            }
            result.push(N);
            return result;
        }
        if(x - 1 >= 0 && !isVisited[x - 1]) {
            queue.push(x - 1);
            route[x - 1] = x;
            isVisited[x - 1] = 1;

        }
        if(x + 1 <= 100000 && !isVisited[x + 1]) {
            queue.push(x + 1);
            route[x + 1] = x;
            isVisited[x + 1] = 1;
        }
        if(x * 2 <= 100000 && !isVisited[x * 2]) {
            queue.push(x * 2);
            route[x * 2] = x;
            isVisited[x * 2] = 1;
        }
    }
    return [];

}

const result = bfs();
const set = new Set(result);
const uniqueResult = [...set];
console.log(`${uniqueResult.length - 1}\n${uniqueResult.reverse().join(" ")}`);