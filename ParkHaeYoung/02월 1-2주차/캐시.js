function solution(cacheSize, cities) {
    if(cacheSize === 0) return cities.length * 5;
    var answer = 0;
    const lru = [];
    cities.forEach((city, idx) => {
        city = city.toLowerCase();
        const findIdx = lru.indexOf(city);
        if(findIdx > -1) {
            lru.splice(findIdx, 1);
            answer += 1;
        } else {
            if(lru.length === cacheSize)
                lru.shift();
            answer += 5;
        }
        lru.push(city);
    });

    return answer;
}