function solution(name) {
    let answer = 0;
    const A = "A".charCodeAt(0);
    const Z = "Z".charCodeAt(0) + 1;
    const standard = "N".charCodeAt(0);

    let min = name.length - 1;

    for(let i = 0; i < name.length; i++) {
        const changeStr = name.charCodeAt(i);

        if(changeStr < standard) {
            answer += changeStr - A;
        } else {
            answer += Z - changeStr;
        }

        let idx = i + 1;
        while (idx < name.length && name[idx] === 'A') idx++;

        min = Math.min(min, i * 2 + name.length - idx);
        min = Math.min(min, (name.length - idx) * 2 + i);

    }

    return answer + min;
}