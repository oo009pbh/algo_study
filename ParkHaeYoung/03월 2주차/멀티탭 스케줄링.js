const fs = require('fs');

// const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n').map((el) => el.split(" ").map(Number));
const input = fs.readFileSync("./input.txt").toString().trim().split('\n').map((el) => el.split(" ").map(Number));

// 멀티탭 구멍 개수 & 전자제품 사용 횟수
const [N, K] = input.shift();
const electronic = input.shift();

let answer = 0;
const plug = Array(N).fill(0);
for (let i = 0; i < K; i++) {
    let isPluggedIn = false;

    // 이미 멀티탭에 꽂혀 있는 전자제품인지 확인
    for(let j = 0; j < N; j++) {
        if(plug[j] === electronic[i]) {
            isPluggedIn = true;
            break;
        }
    }

    if(isPluggedIn) continue;

    // 비어있는 멀티탭에 현재 전자제품 꽂기
    for(let j = 0; j < N; j++) {
        if(!plug[j]) {
            plug[j] = electronic[i];
            isPluggedIn = true;
            break;
        }
    }

    if(isPluggedIn) continue;

    // idx : 제거할 플러그 위치, deviceIdx : j 기준으로 가장 마지막 플러그 위치
    let idx = -1, deviceIdx = -1;
    for(let j = 0; j < N; j++) {
        let lastIdx = 0;

        // 현재 위치 이후의 전자제품 목록을 탐색
        for (let k = i + 1; k < K; k++) {
            if(plug[j] === electronic[k])
                break;
            // 현재 위치의 전자제품과 다른 전자제품이 나오는 index 추출 (몇 번째 만에 나오는지)
            lastIdx++;
        }
        // 현재 시점 이후 첫번째로 나오는 시점이 가장 늦은 플러그 위치 비교
        if(lastIdx > deviceIdx) {
            idx = j;
            deviceIdx = lastIdx;
        }
    }
    answer++;
    plug[idx] = electronic[i];
}


console.log(answer);
