function solution(n) {
    const dp = Array(n + 1).fill(0);
    dp[2] = 3;
    if(n > 2) {
        dp[4] = 11;
        for(let i = 6; i <= n; i += 2) {
            dp[i] = dp[i - 2] * 3 + 2;
            for(let j = i - 4; j > -1; j -= 2) {
                dp[i] += dp[j] * 2;
            }
            dp[i] = dp[i] % 1000000007;
        }
    }
    return dp[n];
}

// 그림 참조 : https://dev-note-97.tistory.com/182
// n = 1 : 0
// n = 2 : 3
// n = 3 : 0
// n = 4 : 11 -> dp[4] = dp[2] * 3 + 2
// n = 5 : 0
// n = 6 : dp[4] * 3 + dp[2] * 2 + 2