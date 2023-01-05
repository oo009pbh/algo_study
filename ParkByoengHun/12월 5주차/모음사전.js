function solution(word) {
    let dictionary = ['A', 'E', 'I', 'O', 'U'];
    let index = 0;
    for (let i = 1 ; i < 5; i++) {
        let temp = [];
        let prevIndex = dictionary.length;
        for (let j = index; j < dictionary.length ; j ++) {
            temp.push(dictionary[j] + "A");
            temp.push(dictionary[j] + "E");
            temp.push(dictionary[j] + "I");
            temp.push(dictionary[j] + "O");
            temp.push(dictionary[j] + "U");
        }
        index = prevIndex;
        dictionary.push(...temp);
    }

    dictionary.sort();
    return dictionary.indexOf(word) + 1;
}

console.log(solution("AAA"))