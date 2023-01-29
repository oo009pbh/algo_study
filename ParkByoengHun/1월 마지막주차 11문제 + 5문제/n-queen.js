const solution = (n) => {
    let answer = 0;
    const stack = Array.from(Array(n), (v, i) => [i]);
    const dfs = () => {
        const curBoard = stack.pop();

        if (curBoard.length === n) {
            answer += 1;
        } else {
            for (let x = 0; x < n; x ++) {
                isValidBoard(curBoard, x);
            }
        }
    }

    const isValidBoard = (curBoard, curX) => {
        let curY = curBoard.length;

        for (let [y, x] of curBoard.entries()) {
            if (curX === x || Math.abs(y - curY) === Math.abs(x - curX)) {
                return ;
            }
        }

        stack.push([...curBoard, curX]);
    }

    while (stack.length > 0) {
        dfs();
    }

    return answer;
}

console.log(solution(6));