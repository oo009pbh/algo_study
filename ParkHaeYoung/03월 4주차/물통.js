const fs = require('fs');

const filePath = process.platform === "linux" ? "./dev/stdin" : "./input.txt";
const [a, b, c, d] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number);

function bfs() {
    const queue = [[0, 0, 0]];
    const set = new Set();

    set.add("0_0");

    let cnt = 1;
    while(queue.length > 0) {
        const [a1, b1, count] = queue.shift();

        if(a1 === c && b1 === d) {
            return count;
        }

        // F(x)
        if(a1 < a && !set.has(`${a}_${b1}`)) {
            set.add(`${a}_${b1}`);
            queue.push([a, b1, count + 1]);
        }
        // F(x)
        if(b1 < b && !set.has(`${a1}_${b}`)) {
            set.add(`${a1}_${b}`);
            queue.push([a1, b, count + 1]);
        }
        // E(x)
        if(a1 && !set.has(`${0}_${b1}`)) {
            set.add(`${0}_${b1}`);
            queue.push([0, b1, count + 1]);
        }
        // E(x)
        if(b1 && !set.has(`${a1}_${0}`)) {
            set.add(`${a1}_${0}`);
            queue.push([a1, 0, count + 1]);
        }
        // M(x)
        const minA = Math.min(a1, b - b1);
        if( a1 && minA > 0 && !set.has(`${a1 - minA}_${b1 + minA}`)) {
            set.add(`${a1 - minA}_${b1 + minA}`);
            queue.push([a1 - minA, b1 + minA, count + 1]);
        }
        // M(x)
        const minB = Math.min(b1, a - a1);
        if( b1 && minB > 0 && !set.has(`${a1 + minB}_${b1 - minB}`) ) {
            set.add(`${a1 + minB}_${b1 - minB}`);
            queue.push([a1 + minB, b1 - minB, count + 1]);
        }
        cnt++;
    }

    return -1;
}

const result = bfs();
console.log(result);