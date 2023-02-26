import sys
import heapq
N, K = map(int, sys.stdin.readline().split())
gem = []
for _ in range(N): # heapq: 무게순 정렬
    heapq.heappush(gem, list(map(int, sys.stdin.readline().split())))
bag = []
for _ in range(K):
    bag.append(int(sys.stdin.readline()))
bag.sort() # 작은 무게 순 정렬 > 작은 가방 부터 담기

answer = 0
tmp_gem = [] 
for b in bag:
    while gem and b >= gem[0][0]:
        heapq.heappush(tmp_gem, -gem[0][1])
        heapq.heappop(gem)
    
    if tmp_gem:
        answer -= heapq.heappop(tmp_gem)
    elif not gem: # 더이상 보석이 없음
        break
print(answer)
