const fs = require('fs');
// const [n, weightList] = fs.readFileSync("./dev/stdin").toString().trim().split('\n');
const [n, weightList] = fs.readFileSync("./input.txt").toString().trim().split('\n');
const weight = weightList.split(" ").map(BigInt).sort((a, b) => (a < b ? -1 : 1));

let answer = -1;
if(n % 2 !== 0) {
    answer = weight.pop();
}

while(weight.length) {
    const lossWeight = weight.shift() + weight.pop();
    if(answer < lossWeight) {
        answer = lossWeight;
    }
}

console.log(String(answer));