def solution(k, d):
    answer = 0
    # 축(몫), 원점
    answer += (d//k)*2 + 1
    tt = set()
    import math
    val = (d//k)
    for j in range(k*val, 0, -k):
        dis = int(math.sqrt(d*d-j*j))
        for i in range(dis, 0, -k):
            dd = math.sqrt((i*i)+(j*j))
            if dd <= math.sqrt(d*d):
                answer += i//k
                # print(str(j)+','+str(i))
                break
        
    answer += len(tt)*2
    return answer
