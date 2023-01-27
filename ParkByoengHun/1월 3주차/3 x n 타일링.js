function solution(n) {
    if (n % 2 === 1) {
         return 0;
    }
    let dp = new Array(n > 4 ? n + 1 : 5).fill(0);
    dp[2] = 3;
    dp[4] = 11;

    for (let i = 6; i <= n ; i += 2) {
        dp[i] += dp[i - 2] * 3 + 2;
        for (let j = i - 4; j >= 2; j -= 2) {
            dp[i] += dp[j] * 2;
        }
        dp[i] %= 1000000007;
    }

    return dp[n];
}
console.log(solution(8))