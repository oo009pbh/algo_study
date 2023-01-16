def solution(order):
    answer = 0
    i = 0
    from collections import deque
    box = [0 for i in range(len(order))]
    for o in range(len(order)):
        box[order[o]-1] = o
    box=deque(box)
    truck = deque()
    trail = deque()
    
    while len(box) > 0:
        if box[0] == answer:
            truck.append(box.popleft())
            answer+=1
        elif len(trail)>0 and trail[-1] == answer:
            truck.append(trail.pop())
            answer+=1
        else:
            trail.append(box.popleft())
        if len(box)==0 and len(trail) > 0 and answer==trail[-1]:
            box.append(trail.pop())
        
    return answer
