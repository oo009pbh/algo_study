function solution(routes) {
    var answer = 0;
    // 간선들의 가중치 : 오름차순으로 정렬
    routes.sort((a, b) => a[1] - b[1]);

    let camera = -30001;
    for (let i = 0; i < routes.length; i++) {
        if(camera < routes[i][0]) {
            answer++;
            camera = routes[i][1];
        }
    }
    return answer;
}