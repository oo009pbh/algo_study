function solution(elements) {
    let sumSet = new Set([]);
    let array = [];

    for (let i = 0; i < elements.length; i ++) {

        array = array.concat(elements);

        for (let j = 0; j < elements.length; j ++) {
            sumSet.add(array.slice(j, j + i).reduce((a, c) => a + c, 0));
        }
    }

    return sumSet.size;
}
console.log(solution([7,9,1,1,4]))