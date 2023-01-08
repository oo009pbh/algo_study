function solution(clothes) {
    let answer = 1;
    let dict = {};

    for (let cloth of clothes) {
        if (cloth[1] in dict ) {
            dict[cloth[1]].push(cloth[0]);
        } else {
            dict[cloth[1]] = [cloth[0]];
        }
    }

    for (let key of Object.keys(dict)) {
        answer *= dict[key].length + 1;
    }

    return answer - 1;
}
console.log(solution(	[["crow_mask", "face"], ["blue_sunglasses", "face"], ["smoky_makeup", "face"]]))