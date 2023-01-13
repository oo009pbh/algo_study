function solution(land) {
    for(let i = 1; i < land.length; i++) {
        const prev = [...land[i - 1]].sort((a, b) => b - a);
        const idx = land[i - 1].indexOf(prev[0]);
        for(let j = 0; j < 4; j++) {
            if(j === idx)
                land[i][j] += prev[1];
            else
                land[i][j] += prev[0];
        }
    }

    return Math.max(...land[land.length-1]);
}
