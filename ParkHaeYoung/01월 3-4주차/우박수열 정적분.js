function solution(k, ranges) {
    var answer = [];
    const 우박수열 = [];
    // 우박 수열 만들기
    while(k !== 1) {
        if(!우박수열.includes(k))
            우박수열.push(k);
        if(k % 2 === 0) {
            k = parseInt(k / 2);
        } else {
            k = k * 3 + 1;
        }
    }
    우박수열.push(1);

    // 사다리꼴 넓이 구하기
    const 사다리꼴넓이 = [];
    for(let i = 1; i < 우박수열.length; i++) {
        사다리꼴넓이.push((우박수열[i-1] + 우박수열[i]) / 2);
    }

    // 구간 별, 합산 값 구하기
    const len = 사다리꼴넓이.length;
    for(let i = 0; i < ranges.length; i++) {
        const [x1, x2] = ranges[i];
        const y = len + x2;

        if(x1 === y)
            answer.push(0.0);
        else if(x1 > y)
            answer.push(-1.0);
        else {
            const filterdValues = 사다리꼴넓이.filter((el, idx) => idx >= x1 && idx < y);
            const sum = filterdValues.reduce((a, b) => a + b, 0.0);
            answer.push(sum * 1.0)
        }
    }


    return answer;
}