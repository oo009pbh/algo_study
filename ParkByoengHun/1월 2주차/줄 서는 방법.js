function solution(n, k) {
    let answer = [];
    let array = Array.from({length: n}, (v, i) => i + 1);
    let nFacto = factorial(n);

    while (answer.length < n) {
        nFacto = nFacto / array.length;
        answer.push(...array.splice(Math.floor((k - 1) / nFacto), 1));
        k = k % nFacto;
    }

    return answer;
}

const factorial = (n) => {
    let answer = 1;
    for (let i = 1; i <= n; i ++) {
        answer *= i;
    }
    return answer;
}

console.log(solution(3, 5))