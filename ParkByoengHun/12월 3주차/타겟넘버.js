const recursive = (numbers, value, i, target) => {
    if (i === numbers.length) {
        return value === target ? 1 : 0;
    } else {
        return recursive(numbers, value + numbers[i], i + 1, target) + recursive(numbers, value - numbers[i], i + 1, target)
    }
}


const solution = (numbers, target) => {
    return recursive(numbers, 0, 0, target);
}


console.log(solution([4, 1, 2, 1], 4));