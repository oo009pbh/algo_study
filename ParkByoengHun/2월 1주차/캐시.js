function solution(cacheSize, cities) {
    let answer = 0;
    let DB = {};
    if (cacheSize === 0) {
        return cities.length * 5;
    }
    for (let [index, city] of cities.entries()) {
        let word = city.toUpperCase();
        if (word in DB) {
            answer += 1;
        } else {
            answer += 5;
            if (Object.keys(DB).length >= cacheSize) {
                let minValue = cities.length;
                let minKey = "";
                for (let key of Object.keys(DB)) {
                    if (minValue >= DB[key]) {
                        minValue = DB[key];
                        minKey = key;
                    }
                }
                delete DB[minKey]
            }
        }
        DB[word] = index;
    }

    return answer;
}

console.log(solution(3, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]))