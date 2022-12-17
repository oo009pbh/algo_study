function solution(numbers, target) {
    let answer = 0;
    let leaves = [0];

    numbers.forEach((num) => {
        const temp = [];
        leaves.forEach((leave) => {
            temp.push(leave + num);
            temp.push(leave - num);
        })
        leaves = temp;
    })
    leaves.forEach((leave) => {
        if(leave === target) answer += 1;
    })
    return answer;
}