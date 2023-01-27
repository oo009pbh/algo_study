function solution(info, query) {
    let answer = [];
    let db = {};

    // 1. info 정보에따라 db에 key값 생성하여 저장해두기
    // ex) java backend junior pizza 150=> jbjp : [150]
    for (let item of info) {
        let [lang, job, expr, fav, grade] = item.split(" ");
        let key = lang[0] + job[0] + expr[0] + fav[0];
        key in db ?  db[key].push(parseInt(grade)) : db[key] = [parseInt(grade)];
    }

    // 2. db의 key값에 해당하는 배열들 정렬
    for (let key of Object.keys(db)) {
        db[key].sort((a, b) => a - b);
    }

    // 3. query에 해당하는 값에 따라서 정규표현식으로 검색
    for (let item of query) {
        let [lang, job, expr, fav_grade] = item.split(" and ");
        let [fav, grade] = fav_grade.split(" ");
        let regex = lang[0] + job[0] + expr[0] + fav[0];
        regex = regex.replace(/-/gi, ".");
        regex = new RegExp(regex);

        let value = 0;
        for (let key of Object.keys(db)) {
            // 4. 검색시 맞다면 이진탐색 lower bound로 grade에 맞는 값 찾기
            if (regex.test(key)) {
                value += binarySearchReturnUpperCount(db[key], parseInt(grade));
            }
        }
        answer.push(value);
    }

    return answer;
}

const binarySearchReturnUpperCount = (arr, target) => {
    let left = 0;
    let right = arr.length;

    while (right > left) {
        const mid = Math.floor((left + right) / 2);
        arr[mid] >= target ? right = mid : left = mid + 1;
    }

    return arr.length - right;
}

console.log(solution(
    ["java backend junior pizza 150",
        "python frontend senior chicken 210",
        "python frontend senior chicken 150",
        "cpp backend senior pizza 260",
        "java backend junior chicken 80",
        "python backend senior chicken 50"],
    ["java and backend and junior and pizza 100",
        "python and frontend and senior and chicken 200",
        "cpp and - and senior and pizza 250",
        "- and backend and senior and - 150",
        "- and - and - and chicken 100",
        "- and - and - and - 150"]))