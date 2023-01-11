function solution(routes) {
    let answer = 0;

    routes.sort((a, b) => b[0] - a[0])

    while (routes.length > 0) {
        let route = routes.pop();
        let [start, end] = route;
        while (routes.length > 0 && routes[routes.length - 1][0] <= end) {
            end = end > routes[routes.length - 1][1] ? routes[routes.length - 1][1] : end;
            routes.pop();
        }
        answer += 1;
    }

    return answer;
}

console.log(solution([[-20, -15], [-14, -5], [-18, -13], [-5, -3]]))