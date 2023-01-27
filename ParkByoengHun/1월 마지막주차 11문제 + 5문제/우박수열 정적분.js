function solution(k, ranges) {
    let answer = [];
    let graph = [k];
    while (k !== 1) {
        k = k % 2 === 0 ? k / 2 : k * 3 + 1;
        graph.push(k);
    }

    for (let [start, end] of ranges) {
        if (start < graph.length + end - 1) {
            let area = (graph[start] + graph[graph.length + end - 1]) / 2;
            for (let i = start + 1; i < graph.length + end - 1; i++) {
                area += graph[i];
            }
            answer.push(Number(area.toFixed(1)));
        } else if (start === graph.length + end - 1) {
            answer.push(0.0);
        } else {
            answer.push(-1.0);
        }
    }

    return answer;

}

console.log(solution(5, [[0,0],[0,-1],[2,-3],[3,-3]]))