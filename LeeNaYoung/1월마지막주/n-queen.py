def solution(n):
    answer = 0
    # 1행, 1열에 1개, 대각선 X
    # 1. 이전 퀸들의 위치를 확인하여 놓을 수 있는 위치 목록 반환
    def is_overlap(queens, k):
        # 이전퀸의 열번호목록, 현재위치, 전체길이
        result = [i for i in range(n)]
        for i, q in enumerate(queens):
            # 1. 같은 열 제거
            if result.count(q) > 0:
                result.remove(q)
            # 2. 대각선 제거
            if result.count(q+(k-i)) > 0:
                # print(str(i)+','+str(q)+'대각선'+str(q+(k-i)))
                result.remove(q+(k-i))
            if result.count(q-(k-i)) > 0:
                # print(str(i)+','+str(q)+'대각선'+str(q-(k-i)))
                result.remove(q-(k-i))
        # print('is_overlap, '+str(queens)+', '+str(k)+':'+str(result))
        return result
    
    # 해당 위치에서의 가능한 개수
    def is_psble(loc):
        result = 0
        if len(loc) == n:
            # print(loc)
            return 1
        queen_psble = is_overlap(loc, len(loc))
        for p in queen_psble:
            result += is_psble(loc+[p])
        # print(str(queen_psble)+', '+str(loc) +', '+ str(result))
        return result
    
    for i in range(n):
        re = is_psble([i])
        answer += re
        # print(str(i)+', '+str(re))
    return answer
