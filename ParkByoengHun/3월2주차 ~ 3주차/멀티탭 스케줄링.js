const readline = require("readline");
const util = require("util");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []

rl.on("line", (line) => {
    input.push(line);
});

rl.on('close', () => {
    let [N, K] = input[0].split(" ").map(item => parseInt(item))
    let stuffs = input[1].split(" ").map(item => parseInt(item))
    let mTap = new Set([]);
    let answer = 0;

    while (stuffs.length > 0) {
        let stuff = stuffs.shift();
        if (mTap.size < N) {
            mTap.add(stuff);
        } else if (!mTap.has(stuff)) {
            let temp = [];
            for (let mTapStuff of mTap) {
                let mTapStuffLoc = stuffs.indexOf(mTapStuff);
                temp.push([mTapStuff, mTapStuffLoc === -1 ? K + 1 : mTapStuffLoc]);
            }
            temp = temp.sort((a, b) => b[1] - a[1]);
            mTap.delete(temp[0][0]);
            mTap.add(stuff);
            answer++;
        }
    }
    console.log(answer);
    process.exit();
})

