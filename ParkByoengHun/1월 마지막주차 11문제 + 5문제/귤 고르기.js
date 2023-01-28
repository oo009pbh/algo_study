const solution = (k, tangerine) => {
    let answer = 0;
    let dict = {};
    for (let item of tangerine) {
        item in dict ? dict[item] += 1 : dict[item] = 1;
    }

    let dictList = Object.values(dict);
    dictList.sort((a, b) => a - b);

    while (k > 0) {
        k -= dictList.pop();
        answer += 1;
    }
    return answer;
}

console.log(solution(6, [1, 3, 2, 5, 4, 5, 2, 3]))