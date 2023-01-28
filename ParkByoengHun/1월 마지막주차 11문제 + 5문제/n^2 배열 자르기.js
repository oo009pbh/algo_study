const solution = (n, left, right) => {
    let answer = [];
    for (let i = left; i < right + 1 ; i++) {
        let [x, y] = [Math.floor(i / n), i % n];
        answer.push(Math.max(x, y) + 1);
    }
    return answer;
}

console.log(solution(3, 2, 5))