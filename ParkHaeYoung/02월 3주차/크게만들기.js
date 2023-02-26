const fs = require('fs');
const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n');
// const input = fs.readFileSync("./input.txt").toString().trim().split('\n');
const [ N, K ] = input.shift().split(' ').map(Number);

const target = input[0].split('').map(Number);
const stack = [];
let k = K;

for(let i = 0; i < target.length; i++) {
    while (k > 0 && stack && stack[stack.length - 1] < target[i]) {
        stack.pop();
        k -= 1;
    }
    stack.push(target[i]);
}
console.log(stack.slice(0, N - K).join(""));

// 앞자리 수가 크면 제일 큰 숫자임 -> 앞에서부터 작은 숫자들을 버려가는 것