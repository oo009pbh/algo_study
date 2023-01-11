function solution(maps) {
    const distance = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const [n, m] = [maps.length, maps[0].length];
    const visit = Array.from(Array(n), e => Array(m).fill(0));
    visit[0][0] = 1;

    let idx = 0;
    const queue = [[0, 0]];
    while(queue.length !== idx) {
        const [x, y] = queue[idx];
        for (let i = 0; i < distance.length; i++) {
            const [newX, newY] = [x + distance[i][0], y + distance[i][1]];
            if(newX < 0 || newY < 0 || newX >= n || newY >= m)
                continue;
            if(!visit[newX][newY] && maps[newX][newY]) {
                visit[newX][newY] = visit[x][y] + 1;
                queue.push([newX, newY]);
            }
        }
        idx++;
    }

    return visit[n - 1][m - 1] || -1;
}