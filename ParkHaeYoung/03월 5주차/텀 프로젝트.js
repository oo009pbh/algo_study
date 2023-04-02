const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").map((el) => el.split(" ").map(Number));

const [T] = input.shift();

function solution(input) {
    const answer = [];
    for (let r = 0; r < T; r++) {
        const [n] = input.shift();
        const person = [0, ...input.shift()];
        const isVisited = Array(n + 1).fill(false);
        const done = Array(n + 1).fill(false);

        let cnt = 0;

        function dfs(x) {
            isVisited[x] = true;
            const nextX = person[x];

            if (!isVisited[nextX]) {
                dfs(nextX);
            } else if (!done[nextX]) {
                for (let j = nextX; j !== x; j = person[j]) {
                    cnt++;
                }
                cnt++;
            }
            done[x] = true;
        }

        for (let i = 1; i <= n; i++) {
            if (!isVisited[i]) {
                dfs(i);
            }
        }

        answer.push(n - cnt);
    }
    return answer.join("\n");
}


const result = solution(input);
console.log(result)