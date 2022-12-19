function solution(n, computers) {
    let answer = 0;
    const visited = new Set([]);

    for(let i = 0; i < n; i++) {
        if(!visited.has(i)) {
            dfs(i, visited, computers);
            answer++;
        }
    }

    return answer;
}

const dfs = (node, visited, computers) => {
    visited.add(node);
    for(let i = 0; i < computers.length; i++) {
        if(computers[node][i] === 1 && !visited.has(i))
            dfs(i, visited, computers);
    }
}

console.log(solution(	3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]]));