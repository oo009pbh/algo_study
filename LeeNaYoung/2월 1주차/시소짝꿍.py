def solution(weights):
    from collections import defaultdict # 사용했을 때 없으면 int-> 0으로 세팅
    answer = 0
    info = defaultdict(int)
    # typs = [[1,1],[2,1],[3,2],[4,3]]
    # info로 불렀을 때 2번째 부터 1씩 추가
    for w in weights:
        answer += info[w] + info[w*2] + info[w/2] + info[(w*2)/3] + info[(w*3)/2] + info[(w*4)/3] + info[(w*3)/4]
        info[w] += 1
    return answer
