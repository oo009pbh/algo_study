function solution(n, computers) {
    let answer = 0;
    const visited = [];
    for(let i = 0; i < n; i++) {
        if(!visited.includes(i)) {
            // 방문하지 않은 곳을 간다 === 새로운 네트워크가 있다는 뜻
            dfs(i, computers, visited);
            answer += 1;
        }
    }
    return answer;
}

function dfs(i, computers, visited) {
    visited.push(i);
    computers[i].forEach((el, idx) => {
        if(el === 1 && !visited.includes(idx))
            dfs(idx, computers, visited);
    })
}