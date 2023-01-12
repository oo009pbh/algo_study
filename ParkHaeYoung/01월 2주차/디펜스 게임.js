function solution(n, k, enemy) {
    let answer = 0;
    const minHeap = new MinHeap();

    // 공격 횟수 만큼 반복문
    for(let i = 0; i < enemy.length; i++) {
        // heap 안에 무적권 갯수만큼 담는다.
        if(minHeap.size() < k) {
            minHeap.heapPush(enemy[i]);
            answer++;
        } else {
            const min = minHeap.getMin();

            // heap의 최솟 값이 공격하는 값보다 작을 때
            if(enemy[i] > min) {
                // 보유한 병사 수에 최솟 값을 뺀다.
                n -= min;

                // heap의 최솟 값을 공격 값과 교체
                minHeap.heapPop(min);
                minHeap.heapPush(enemy[i]);
            } else {
                // heap의 최솟 값보다 크면 해당 공격값을 보유한 병사 수에서 뺀다.
                n -= enemy[i];
            }

            // 보유한 병사 수가 0보다 클 때만 라운드 증가
            n >= 0 && answer++;
        }
    }




    return answer;
}

class MinHeap {
    constructor() {
        this.heap = [null]; // 첫 번째 인덱스 사용 X
    }

    size() {
        return this.heap.length - 1;
    }

    getMin() {
        return this.heap[1] ? this.heap[1] : null;
    }

    // 노드를 교체하는 기능을 하는 swap 함수로 분리
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    heapPush(value) {
        this.heap.push(value);
        let curIdx = this.heap.length - 1;
        let parentIdx = Math.floor(curIdx / 2);

        // 최소힙이므로 부모 노드가 작아야 한다.
        // 따라서 부모 노드가 현재 노드보다 큰 지 검사하며 반복한다.
        while (curIdx > 1 && this.heap[curIdx] < this.heap[parentIdx]) {
            this.swap(parentIdx, curIdx);
            curIdx = parentIdx;
            parentIdx = Math.floor(curIdx / 2);
        }
    }
    heapPop() {
        const min = this.heap[1];
        if (this.heap.length <= 2) this.heap = [null];
        else this.heap[1] = this.heap.pop();

        let curIdx = 1;
        let leftIdx = curIdx * 2;
        let rightIdx = curIdx * 2 + 1;

        // 루트만 있을 때
        // 왼쪽 자식 노드가 없다면 오른쪽 노드도 없는 상태
        // 즉, 루트 노드만 존재하는 상황이다.
        if (!this.heap[leftIdx]) return min;

        // 왼쪽 자식 노드만 존재할 때
        if (!this.heap[rightIdx]) {
            if (this.heap[leftIdx] < this.heap[curIdx]) {
                this.swap(leftIdx, curIdx);
            }
            return min;
        }

        // 왼쪽 자식 노드, 오른쪽 자식 노드가 모두 있을 때
        // 최소힙이므로 부모 노드가 작아야 한다.
        // 따라서 현재 노드가 왼쪽 노드 또는 오른쪽 노드보다 큰 지 검사하며 반복한다.
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
}