def solution(cacheSize, cities):
    answer = 0
    if cacheSize == 0:
        return len(cities)*5
    cities = [city.upper() for city in cities]
    from collections import deque
    cache = deque(['' for i in range(cacheSize)])
    for city in cities:
        if city in cache:
            cache.remove(city)
            cache.append(city)
            answer += 1
        else:
            cache.popleft()
            cache.append(city)
            answer += 5
    return answer
