function solution(order) {
    let answer = 0;
    const stack = []; // 보조 컨테이너 역할

    for(let i = 1; i <= order.length; i++) {
        // 박스를 보조 컨테이너에 넣고 보기
        stack.push(i);

        // 보조 컨테이너의 마지막 값 === 현재 담아야 하는 박스
        while(stack.length > 0 && stack[stack.length - 1] === order[answer]) {
            stack.pop();
            answer++;
        }
    }
    return answer;
}