# https://school.programmers.co.kr/learn/courses/30/lessons/142085
def solution(n, k, enemy):
    if k == len(enemy):
        return k
    
    import heapq
    li = []
    m = 0
    answer = 0
    for i in range(len(enemy)):
        answer += 1
        if n >= m + enemy[i]:
            heapq.heappush(li, int(-enemy[i]))
            m += enemy[i]
        elif k > 0:
            k-=1
            heapq.heappush(li, int(-enemy[i]))
            m += enemy[i] + heapq.heappop(li)
        else: 
            return answer-1
    return answer