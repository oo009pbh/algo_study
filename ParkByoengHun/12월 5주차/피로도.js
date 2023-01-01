function solution(k, dungeons) {
    var answer = 0;
    let queue = [];
    for (let [index, dungeon] of dungeons.entries()) {
        if (k >= dungeon[0]) {
            queue.push([k - dungeon[1], [index], 1]);
        }
    }

    while(queue.length > 0) {
        let [left, visited, val] = queue.shift();
        let lenq = queue.length;
        for (let [index, dungeon] of dungeons.entries()) {
            if (!visited.includes(index) && left >= dungeon[0]) {
                queue.push([left - dungeon[1], [...visited, index], val + 1]);
            }
        }
        if (lenq === queue.length) {
            answer = Math.max(val, answer);
        }
    }

    return answer;
}