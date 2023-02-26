// 성냥개비 https://www.acmicpc.net/problem/3687 골드 2
// 2개 : 1
// 3개 : 7
// 4개 : 4
// 5개 : 2, 3, 5
// 6개 : 6, 9, 0
// 7개 : 8
// 가장 큰 숫자 : 성냥개비를 가장 적게 써서 길게 늘여놓는다.
// -> 짝수개의 성냥 : 11111~, 홀수개의 성냥 : 711111~
// 가장 작은 숫자
// min = [1,7,4,2,6,8] & [1,7,4,2,0,8]

const fs = require('fs');

const getMaxNumber = (num) => {
    const result = [];
    const length = parseInt(num / 2);
    if(num % 2 === 1) {
        result.push(7);
    } else {
        result.push(1);
    }

    for (let i = 0; i < length - 1; i++) {
        result.push(1);
    }
    return result.join("");
}

const makeMinData = (dp) => {
    const add = ["1", "7", "4", "2", "0", "8"];

    for (let i = 9; i <= 100; i++) {
        for (let j = 2; j <= 7; j++) {
            const current = dp[i - j] + add[j - 2];
            dp[i] = Math.min(dp[i], parseFloat(current));
        }
    }
}

const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n').map(Number);
// const input = fs.readFileSync("./input.txt").toString().trim().split('\n').map(Number);

const dp = Array.from({length:101} , () => Infinity);
[0, 0, 1, 7, 4, 2, 6, 8, 10].forEach((el, idx) => {
    dp[idx] = el;
})
makeMinData(dp);
for( let i = 1; i < input.length; i++) {
    const max = getMaxNumber(input[i]);
    console.log(`${dp[input[i]]} ${max}`)
}

