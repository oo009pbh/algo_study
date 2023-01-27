function solution(storey) {
    let answer = 0;
    let standard = 10;
    while (storey !== 0) {
        let value = storey % standard;

        if (value > standard / 2) {
            storey += (standard - value);
            answer += (standard - value) / (standard / 10);
        } else if (value === standard / 2) {
            if (((storey + value) / standard) % 10 > 5 || ((storey + value) / standard) % 10 === 0) {
                storey += value;
            } else {
                storey -= value;
            }
            answer += value / (standard / 10)
        } else {
            storey -= value;
            answer += value / (standard / 10)
        }

        standard *= 10;
    }

    return answer;
}

console.log(solution(545))