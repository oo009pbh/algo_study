const solution = (n, wires) => {
    let answer = 100;
    let adjacent = {};
    for (let wire of wires) {
        if (adjacent.hasOwnProperty(wire[0])) adjacent[wire[0]].add(wire[1]);
        else adjacent[wire[0]] = new Set ([wire[1]]);
        if (adjacent.hasOwnProperty(wire[1])) adjacent[wire[1]].add(wire[0]);
        else adjacent[wire[1]] = new Set ([wire[0]]);
    }

    for (let wire of wires) {
        answer = Math.min(countElectricTower(adjacent,wire,n), answer);
    }

    return answer;
}

const countElectricTower = (adjacent, wire, n) => {
    let [a, b] = wire;
    let count = 0;
    adjacent[a].delete(b);
    let visited = new Set ([])
    let queue = [a];

    while (queue.length > 0) {
        let current = queue.shift();
        visited.add(current);
        count += 1;

        if (adjacent.hasOwnProperty(current) && adjacent[current].size > 0) {
            for (let item of adjacent[current]) {
                if (!visited.has(item)) {
                    queue.push(item);
                }
            }
        }
    }

    adjacent[a].add(b);
    return Math.abs((n - count) - count );
}

console.log(solution(	9, [[1, 3], [2, 3], [3, 4], [4, 5], [4, 6], [4, 7], [7, 8], [7, 9]]))