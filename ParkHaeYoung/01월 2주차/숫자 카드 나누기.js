function solution(arrayA, arrayB) {
    let answer = 0;
    const A = gcdByArray(arrayA);
    const B = gcdByArray(arrayB);

    const gcdList = [A, B].sort((a, b) => b - a);
    for(let i = 0; i < gcdList.length; i++) {
        const el = gcdList[i];

        if(arrayA.every((a) => a % el === 0) && !arrayB.some((b) => b % el === 0))
            return el;
        if(arrayB.every((b) => b % el === 0) && !arrayA.some((a) => a % el === 0))
            return el;
    }

    return answer;
}

const gcdByArray = (array) => {
    let result = array[0];
    for (let i = 1; i < array.length; i++) {
        result = gcd(result, array[i]);
    }
    return result;
}

// 최대공약수 구하기
const gcd = (a, b) => {
    if (a % b === 0)
        return b;
    else
        return gcd(b, a % b);
}