const fs = require('fs');

// const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n').map((el) => el.split(" ").map(Number));
const input = fs.readFileSync("./input.txt").toString().trim().split('\n').map((el) => el.split(" ").map(Number));

const [N] = input.shift();
const [K] = input.shift();
const points = input.shift().sort((a, b) => a - b);

const gaps = [];
for(let i = 1; i < points.length; i++) {
    const gap = Math.abs(points[i] - points[i - 1]);
    gaps.push(gap);
}

const cnt = N - K;
gaps.sort((a, b) => a - b);

console.log(gaps.slice(0, cnt).reduce((prev, curr) => prev + curr, 0));
// [ 1, 3, 6, 6, 7, 9 ] -> [ 1, 3 ] & [ 6, 6, 7, 9 ]

