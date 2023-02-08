function solution(storey) {
    let answer = 0;

    while(storey) {
        const current = parseInt(storey % 10);
        const next = parseInt((storey / 10) % 10);

        if(current > 5) {
            answer += 10 - current;
            storey += 10;
        } else if (current === 5) {
            answer += 5;
            storey += next >= 5 ? 10 : 0;
        } else {
            answer += current;
        }
        storey = parseInt(storey / 10);
    }


    return answer;
}