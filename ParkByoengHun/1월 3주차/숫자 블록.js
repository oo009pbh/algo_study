function solution(begin, end) {
    let answer = [];

    for (let i = begin ; i <= end; i ++) {
        answer.push(countBlock(i));
    }

    return answer;
}

const countBlock = (number) => {
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0 && number / i < 1e7) return number / i;
    }

    return number === 1 ? 0 : 1;
}

console.log(solution(1, 10))