function solution(n = 0) {
    let cnt = n.toString(2).split("1").length - 1;

    n ++;
    while (cnt !== n.toString(2).split("1").length - 1) {
        n += 1
    }
    return n;
}

console.log(solution(78))