const fs = require('fs');

// const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n').map((el) => el.split(" ").map(Number));
const input = fs.readFileSync("./input.txt").toString().trim().split('\n').map((el) => el.split(" ").map(Number));

const [N, C] = input.shift();
const [M] = input.shift();

// 도착지가 빠른 순으로 정렬 -> 빨리 무게를 털어내야 다음 물건을 배송할 수 있다.
const conditions = input.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

let answer = 0;
const truck = {};
conditions.forEach((condition) => {
    const [start, end, box] = condition;
    let max = 0;

    // 물건을 실을 수 있는 최대 무게를 구하기 위해, 현재 구간에서의 최대 값 추출
    for(let i = start; i < end; i++) {
        max = Math.max(max, truck[i] || 0);
    }

    const weight = max + box > C ? C - max : box;
    for(let i = start; i < end; i++) {
        truck[i] = truck[i] ? truck[i] + weight : weight;
    }
    answer += weight;
})

console.log(answer);