def solution(n, k):
    answer = []
    line = [i for i in range(1,n+1)]
    k-=1
    # def fac(num):
    #     result = 1
    #     for i in range(1, num+1):
    #         result *= i
    #     return result
    import math
    for i in range(n-1,0,-1):
        m = math.factorial(i) #fac(i)
        answer.append(line[k//m])
        del line[k//m]
        k = k%m
    answer.append(line[0])
    return answer