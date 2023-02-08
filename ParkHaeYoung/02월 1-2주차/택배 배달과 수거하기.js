function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    const accumulateDeliveries = [...deliveries];
    const accumulatePickups = [...pickups];

    for(let i = n-2; i >= 0; i--) {
        accumulateDeliveries[i] = accumulateDeliveries[i] + accumulateDeliveries[i + 1];
        accumulatePickups[i] = accumulatePickups[i] + accumulatePickups[i + 1];
    }

    let sumCap = 0;
    for(let i = n - 1; i >= 0; i--) {
        const max = Math.max(accumulateDeliveries[i], accumulatePickups[i]);
        if(max > sumCap) {
            // 동일한 index에 한번 이상 방문해야 할 경우 -> double check
            const double = (max - sumCap) / cap + (max % cap ? 1 : 0);
            answer += (i + 1) * parseInt(double);
            sumCap += parseInt(double) * cap;
        }
    }

    return answer * 2;
}