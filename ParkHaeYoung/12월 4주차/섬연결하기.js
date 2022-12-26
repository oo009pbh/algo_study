function solution(n, costs) {
    let answer = 0;
    const parent = [];

    // 초기 : 각각의 부모는 자기 자신.
    for(let i = 0; i < n; i++)
        parent.push(i);

    // 간선들의 가중치 : 오름차순으로 정렬
    costs.sort((a, b) => a[2] - b[2]);
    for(const cost of costs) {
        // 각 정점이 같은 부모를 가지고 있지 않으면,
        // 다리를 연결한다. => union
        if(!findParent(parent, cost[0], cost[1])) {
            answer += cost[2];
            unionParent(parent, cost[0], cost[1]);
        }
    }
    return answer;
}

// 최소 비용 신장 트리(MST)
// Kruskal 알고리즘 === Greedy 알고리즘
const getParent = (parent, x) => {
    if(parent[x] === x) return x;
    return parent[x] = getParent(parent, parent[x]);
}

const unionParent = (parent, a, b) => {
    const n1 = getParent(parent, a);
    const n2 = getParent(parent, b);
    if(n1 < n2) return parent[n2] = n1;
    else return parent[n1] = n2;
}

const findParent = (parent, a, b) => {
    const n1 = getParent(parent, a);
    const n2 = getParent(parent, b);
    return n1 === n2;
}