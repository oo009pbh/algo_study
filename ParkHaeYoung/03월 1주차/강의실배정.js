class MinHeap {
    constructor() {
        this.heap = [null];
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    heappush(value) {
        this.heap.push(value);
        let curIdx = this.heap.length - 1;
        let parentIdx = Math.floor(curIdx / 2);

        while (curIdx > 1 && this.heap[curIdx] < this.heap[parentIdx]) {
            this.swap(curIdx, parentIdx);
            curIdx = parentIdx;
            parentIdx = Math.floor(curIdx / 2);
        }
    }

    heappop() {
        const min = this.heap[1];
        if (this.heap.length <= 2) this.heap = [null];
        else this.heap[1] = this.heap.pop();

        let curIdx = 1;
        let leftIdx = curIdx * 2;
        let rightIdx = curIdx * 2 + 1;

        if (!this.heap[leftIdx]) return min;
        if (!this.heap[rightIdx]) {
            if (this.heap[leftIdx] < this.heap[curIdx]) {
                this.swap(leftIdx, curIdx);
            }
            return min;
        }

        while (
            this.heap[leftIdx] < this.heap[curIdx] ||
            this.heap[rightIdx] < this.heap[curIdx]
            ) {
            const minIdx =
                this.heap[rightIdx] < this.heap[leftIdx] ? rightIdx : leftIdx;
            this.swap(minIdx, curIdx);
            curIdx = minIdx;
            leftIdx = curIdx * 2;
            rightIdx = curIdx * 2 + 1;
        }

        return min;
    }

    size() {
        return this.heap.length - 1;
    }
}

const fs = require('fs');
// const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n');
const input = fs.readFileSync("./input.txt").toString().trim().split('\n');
const times = input.map((el) => el.split(" ").map(Number)).slice(1).sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])

solution(times);

function solution(times){
    const heap = new MinHeap();
    for(let i = 0; i < times.length; i++) {
        const [startTime, endTime] = times[i];
        const min = heap.heappop();
        if(min > startTime) {
            heap.heappush(min);
        }
        heap.heappush(endTime);
    }
    console.log(heap.size());
}