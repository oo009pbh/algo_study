function solution(k, dungeons) {
    const answer = [];
    const visited = Array(dungeons.length).fill(false);
    dfs(k, dungeons, answer, 0, visited);
    return Math.max(...answer);
}


function dfs(k, dungeons, answer, cnt, visited) {
    answer.push(cnt);

    for(let i = 0; i < dungeons.length; i++) {
        if(visited[i]) continue;
        if(k >= dungeons[i][0]) {
            visited[i] = true;
            dfs(k - dungeons[i][1], dungeons, answer, cnt + 1, visited);
            visited[i] = false;
        }
    }
}