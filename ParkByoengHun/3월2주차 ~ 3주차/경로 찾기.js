const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});

rl.on('close', () => {
    let N = parseInt(input[0])
    let answer = Array.from(Array(N), (v, i) => new Array(N).fill(0));
    let graph = Array.from(Array(N), (v, i) => new Set([]));

    for (let i = 1; i <= N; i++) {
        input[i].split(" ").map((item, index) => {
            if (parseInt(item) === 1) {
                graph[i - 1].add(index);
            }
        })
    }

    const DFS = (i) => {
        let temp = [...graph[i]];
        let visited = new Set([]);
        while (temp.length > 0) {
            let cur = temp.pop();
            visited.add(cur);
            answer[i][cur] = 1;
            temp = temp.concat([...graph[cur]].filter(item => !visited.has(item)))
        }
    }

    for (let i = 0; i < N; i++) {
        DFS(i);
    }

    for (let i = 0; i < N; i++) {
        console.log(answer[i].join(" "));
    }
    process.exit();
})



