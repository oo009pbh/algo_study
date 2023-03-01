const fs = require('fs');

// const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n').map((el) => el.split(" ").map(Number));
const input = fs.readFileSync("./input.txt").toString().trim().split('\n').map((el) => el.split(" ").map(Number));

const [N, K] = input.shift();
const children = input.shift().sort((a, b) => a - b);

const gaps = [];
for(let i = 1; i < children.length; i++) {
    const gap = Math.abs(children[i] - children[i - 1]);
    gaps.push(gap);
}

const cnt = N - K;
gaps.sort((a, b) => a - b);

console.log(gaps.slice(0, cnt).reduce((prev, curr) => prev + curr, 0));
