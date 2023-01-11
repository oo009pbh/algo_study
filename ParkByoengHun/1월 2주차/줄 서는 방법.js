function solution(n, k) {
    let answer = [];
    let array = Array.from({length: n}, (v, i) => i + 1);


    return answer;
}

const factorial = (n) => {
    let answer = 1;
    for (let i = 1; i < n; i ++) {
        answer *= i;
    }
    return answer;
}
//아직 안푼 상태

console.log(solution(3, 5))