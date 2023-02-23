const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split(' ');
// const input = fs.readFileSync('./input.txt').toString().split(' ').map((item) => Number(item));

solution(input);

function solution(input) {
    const [N, a, b] = input;

    const answer = [];

    const max = Math.max(a, b);

    for(let i = 1; i < a; i++) {
        answer.push(i);
    }
    answer.push(max);
    for(let i = b - 1; i >= 1; i--) {
        answer.push(i);
    }
    if(N < answer.length)
        console.log(-1);
    else {
        const temp = [];
        for(let i = 0; i < N - answer.length; i++) {
            temp.push(1);
        }
        const result = [answer[0], ...temp, ...answer.slice(1)];
        console.log(result.join(" "));

    }
}