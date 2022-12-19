function solution(maps) {
    let answer = -1;

    // 가로 길이
    let N = maps[0].length;
    // 세로 길이
    let M = maps.length;

    let needVisit = [[0, 0, 1]];
    let count = 0;

    while (needVisit.length > 0) {
        let [x, y, count] = needVisit.shift();
        maps[y][x] = -1;
        if (x === N - 1 && y === M - 1) {
            answer = count;
            break;
        }

        if (0 <= y - 1 && maps[y - 1][x] === 1) {
            maps[y - 1][x] = -2;
            needVisit.push([x, y - 1, count + 1]);
        }
        if (0 <= x - 1 && maps[y][x - 1] === 1) {
            maps[y][x - 1] = -2;
            needVisit.push([x - 1, y, count + 1]);
        }
        if (M > y + 1 && maps[y + 1][x] === 1) {
            maps[y + 1][x] = -2;
            needVisit.push([x, y + 1, count + 1]);
        }
        if (N > x + 1 && maps[y][x + 1] === 1) {
            maps[y][x + 1] = -2;
            needVisit.push([x + 1, y, count + 1]);
        }
    }

    return answer;
}

console.log(solution(
    [
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 0, 0, 1]
    ]));