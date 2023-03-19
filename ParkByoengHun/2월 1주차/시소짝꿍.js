function solution(weights) {
    let answer = 0;
    let weightDb = new Array(1001).fill(0);

    for (let weight of weights) {
        weightDb[weight] += 1;
    }

    for (let i = 100; i <= 1000; i ++) {
        if (weightDb[i] > 0) {
            answer += factorial(i - 1);

        }
    }
    return answer;
}

const factorial = (num) => {
    if (num === 0) return 0;
    else if (num === 1) return 1;
    else {
        let facorial = 1;
        for (let i = num; i >= 1 ; i --) {
            facorial *= i;
        }
        return facorial
    }
}
console.log(solution("1S2D*3T"))