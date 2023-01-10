function solution(topping) {
    let answer = 0;
    let left = new Set([]);
    let leftArray = new Array(topping.length).fill(0);
    let right = new Set([]);
    let rightArray = new Array(topping.length).fill(0);

    for (let i = 0 ; i < topping.length ; i++) {
        left.add(topping[i]);
        leftArray[i] = left.size;
    }

    for (let i = topping.length - 1 ; i >= 0 ; i--) {
        right.add(topping[i]);
        rightArray[i] = right.size;
    }

    for (let i = 0 ; i < topping.length - 1 ; i++) {
        answer += leftArray[i] === rightArray[i + 1] ? 1 : 0;
    }

    return answer;
}

console.log(solution( [1, 2, 1, 3, 1, 4, 1, 2]))