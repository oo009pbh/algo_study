function solution(word) {
    const alphabet = "AEIOU";
    // 각 자리수 별, 증가하는 cost 계산
    const cost = [781, 156, 31, 6, 1];
    let answer = 0;
    // A : 1, AA : 2, ...
    for(let i = 0; i < word.length; i++) {
        const target = alphabet.indexOf(word[i]);
        answer += cost[i] * target + 1;
    }
    return answer;
}
// // 1개 씩 변경
// A
// AA
// AAA
// AAAA
// AAAAA
// AAAAE
// AAAAI
// AAAAO
// AAAAU
//
// // 6개 씩 변경 (5 + 1)
// AAAE
// AAAEA
// AAAEE
// AAAEI
// AAAEO
// AAAEU