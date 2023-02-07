function solution(weights) {
    let answer = 0;

    const store = {};
    const ratio = [1, 3/2, 2, 4/3];

    weights.sort((a, b) => b - a).forEach((weight) => {
        ratio.forEach((el) => {
            const key = weight * el;
            if(store[key]) {
                answer += store[key];
            }
        });
        if(!store[weight]) store[weight] = 1;
        else store[weight]++;
    })

    return answer;
}