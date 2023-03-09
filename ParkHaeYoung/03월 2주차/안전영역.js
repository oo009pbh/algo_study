const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const [n, ...input] = fs.readFileSync(filePath).toString().trim().split("\n");

const result = solution(input.map((el) => el.split(" ").map(Number)), Number(n));
console.log(result || 1); // 모두 안전 지역일 경우, 기본 1


function solution(graph, N) {
    // 주어진 조건의 영역 break point 추출을 위해 set 적용
    const uniqueArea = Array.from(new Set(graph.flat()));
    let max = 0;

    const y = [0, 1, 0, -1];
    const x = [1, 0, -1, 0];

    const dfs = (cY, cX, isVisited) => {
        isVisited[cY][cX] = true;

        for(let i = 0; i < 4; i++) {
            const nY = cY + y[i];
            const nX = cX + x[i];

            if(nX < 0 || nX >= N || nY < 0 || nY >= N)
                continue;

            if(!isVisited[nY][nX]) {
                dfs(nY, nX, isVisited);
            }
        }
    }
    
    for(let h = 0; h < uniqueArea.length; h++) {
        let count = 0;
        const isVisited = [...Array(N)].map((_, x) => [...Array(N)].map((_, y) => graph[x][y] <= uniqueArea[h]));

        for(let i = 0; i < N; i++) {
            for(let j = 0; j < N; j++) {
                if(!isVisited[i][j]) {
                    dfs(i, j, isVisited);
                    count++;
                }
            }
        }
        max = Math.max(max, count);
    }

    return max;
}