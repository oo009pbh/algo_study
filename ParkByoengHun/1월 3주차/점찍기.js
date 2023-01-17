function solution(k, d) {
    let answer = 0;

    for (let x = 0; x * k <= d; x ++) {
        let y = parseInt(Math.sqrt(d * d - (x * k) * (x * k)) / k)
        answer += y + 1;
    }
    return answer;
}

console.log(solution(2, 4))