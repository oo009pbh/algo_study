def solution(want, number, discount):
    answer = 0
    for i in range(len(discount)-9):
        mber = discount[i:i+10]
        cnt = 0
        for i, w in enumerate(want):
            c = mber.count(w)
            if mber.count(w) == number[i]:
                cnt += c
            else: break
        if cnt == 10:
            answer+= 1
    return answer