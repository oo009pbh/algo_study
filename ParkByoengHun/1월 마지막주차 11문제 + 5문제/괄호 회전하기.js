const solution = (s) => {
    let answer = 0;

    for (let i = 0; i < s.length ; i ++) {
        let temps = s.substring(i, s.length) + s.substring(0, i);
        answer += validateBracket(temps)
    }

    return answer;
}

const validateBracket = (s) => {
    let queue = [];
    let dict = {
        "[" : "]",
        "(" : ")",
        "{" : "}"
    }

    for (let bracket of s) {
        if (bracket in dict) {
            queue.push(bracket);
        } else if (queue.length > 0 && dict[queue[queue.length - 1]] === bracket) {
            queue.pop();
        } else {
            return 0;
        }
    }

    return queue.length > 0 ? 0 : 1;
}

console.log(solution("}]()[{"))