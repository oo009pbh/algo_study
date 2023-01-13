// 동적 계획법 : DP 문제
function solution(n) {
    // 아이디어 : 피보나치 수열
    const dp = Array(n).fill(0);
    dp[0] = 1;
    dp[1] = 2;
    for(let i = 2; i < n; i++) {
        dp[i] = (dp[i-1] + dp[i-2]) % 1000000007;
    }

    return dp[n - 1];
}

// n = 1 : 1
// n = 2 : 2
// n = 3 : 3
// n = 4 : 5
// dp[n] = dp[n-1] + dp[n-2]