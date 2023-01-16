function solution(rows, columns, queries) {
    const answer = [];
    const matrix = [];
    for(let i = 0; i < rows; i++) {
        const temp = [];
        for(let j = 0; j < columns; j++) {
            temp.push(i * columns + j + 1);
        }
        matrix.push(temp);
    }

    for(let i = 0; i < queries.length; i++) {
        const [x1, y1, x2, y2] = queries[i];
        const firstValue = matrix[x1 - 1][y2 - 1];
        let minValue = firstValue;

        for(let j = y2 - 1; j >= y1; j--) {
            minValue = Math.min(minValue, matrix[x1 - 1][j - 1]);
            matrix[x1 - 1][j] = matrix[x1 - 1][j - 1];
        }
        for(let j = x1; j < x2; j++) {
            minValue = Math.min(minValue, matrix[j][y1 - 1]);
            matrix[j - 1][y1 - 1] = matrix[j][y1 - 1];
        }
        for(let j = y1; j < y2; j++) {
            minValue = Math.min(minValue, matrix[x2 - 1][j]);
            matrix[x2 - 1][j - 1] = matrix[x2 - 1][j];
        }
        for(let j = x2 - 1; j > x1; j--) {
            minValue = Math.min(minValue, matrix[j - 1][y2 - 1]);
            matrix[j][y2 - 1] = matrix[j - 1][y2 - 1];
        }
        matrix[x1][y2 - 1] = firstValue;

        answer.push(minValue);
    }


    return answer;
}