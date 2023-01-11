function solution(n, wires) {
    let answer = n;
    // 인접 행렬 만들기
    const graph = makeGraph(n, wires);
    wires.forEach((wire) => {
        const a = wire[0] - 1;
        const b = wire[1] - 1;

        graph[a][b] = 0;
        graph[b][a] = 0;

        // bfs : 몇 개가 연결되어 있는지 탐색
        // 차이가 최소인 값으로 적용
        answer = Math.min(answer, bfs(n, a, graph))

        graph[a][b] = 1;
        graph[b][a] = 1;

    })
    return answer;
}

function bfs(n, start, graph) {
    const visited = new Array(n).fill(false);
    let cnt = 1;

    const stack = [start];

    while(stack.length) {
        const target = stack.shift();
        visited[target] = true;

        for(let i = 0; i < n; i++) {
            if(!visited[i] && graph[target][i] === 1) {
                stack.push(i)
                cnt++;
            }
        }
    }
    return Math.abs(cnt - (n - cnt));
}

// 인접 행렬 만들기
function makeGraph(n, wires) {
    const graph = new Array(n).fill(0).map((row) => new Array(n).fill(0))

    wires.forEach((wire) => {
        graph[wire[0]-1][wire[1]-1] = 1;
        graph[wire[1]-1][wire[0]-1] = 1;
    })
    return graph;
}

