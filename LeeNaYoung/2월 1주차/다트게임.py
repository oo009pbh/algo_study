def solution(dartResult):
    answer = 0
    import re
    nums = re.findall(r'\d+', dartResult) # 숫자리스트
    num = [int(i) for i in nums]
    print(num)
    string = re.findall('[a-zA-Z*#]+', dartResult)
    print(string)
    for i in range(len(num)):
        # S는 1승이므로 계산X
        if string[i][0] == 'D':
            num[i] = num[i]**2
        elif string[i][0] == 'T':
            num[i] = num[i]**3
        if len(string[i]) > 1:
            if string[i][1] == '*':
                num[i] *= 2
                if i > 0:
                    num[i-1] *= 2
            elif string[i][1] == '#':
                num[i] *= (-1)
    answer = sum(num)
    return answer
