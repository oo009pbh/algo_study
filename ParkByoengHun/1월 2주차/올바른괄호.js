function solution(s){
    let cnt = 0;
    for (let a of s) {
        if (a === "(") {
            cnt += 1;
        } else {
            if (cnt < 1) return false;
            cnt -= 1;
        }
    }

    return cnt === 0;
}

console.log(solution("(())()"))