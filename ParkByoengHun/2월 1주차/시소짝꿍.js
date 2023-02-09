function solution(weights) {
    let answer = 0;
    const wArray = new Array(1001).fill(0);

    for (let weight of weights) {
        wArray[weight] += 1;
    }

    for (let i = 100; i <= 1000; i++) {
        if (wArray[i] > 0) {
            answer += nP2(wArray[i]);
            if (i * 2 <= 1000) {
                answer += wArray[i * 2] * wArray[i];
            }
            if (i % 2 === 0 && (i * 3) / 2 <= 1000) {
                answer += wArray[(i * 3) / 2] * wArray[i];
            }
            if (i % 3 === 0 && (i * 4) / 3 <= 1000) {
                answer += wArray[(i * 4) / 3] * wArray[i];
            }
        }
    }

    return answer;
}

const nP2 = (num) => {
    if (num <= 1) {
         return 0;
    } else if (num <= 2) {
        return 1;
    } else {
        return (num * (num - 1)) / 2;
    }
}

console.log(solution([100,100,100,100,100]))