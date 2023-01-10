function solution(want, number, discount) {
    let answer = 0;
    let cntItem = number.reduce((prev, item) => prev + item, 0);
    let need = {};
    let basket = {};
    for (let [index, item] of want.entries()) {
        need[item] = number[index];
        basket[item] = 0;
    }

    for (let i = 0 ; i < cntItem ; i ++) {
        discount[i] in basket ? basket[discount[i]] += 1 : null;
    }

    answer = isFullFunction(need,basket) ? answer + 1 : answer;

    for (let i = cntItem ; i < discount.length ; i ++) {
        if (discount[i - cntItem] in basket) {
            basket[discount[i - cntItem]] -= 1;
        }
        if (discount[i] in basket) {
            basket[discount[i]] += 1;
        }
        answer = isFullFunction(need,basket) ? answer + 1 : answer;
    }
    return answer;
}

const isFullFunction = (need, basket) => {
    for (let key of Object.keys(need)) {
        if (!(key in basket && basket[key] >= need[key])) {
            return false;
        }
    }
    return true;
}
console.log(solution(["banana", "apple", "rice", "pork", "pot"], [3, 2, 2, 2, 1] ,["chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana", "pork", "rice", "pot", "banana", "apple", "banana"]))