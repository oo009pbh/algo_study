def solution(book_time):
    def change_min(str_time: str) -> int:
        return int(str_time[0:2]) * 60 + int(str_time[3:])
    # 예약 시간이 빠른 순으로 정렬
    book_times = [[change_min(i[0]), change_min(i[1]) + 10] for i in book_time]
    book_times.sort(key = lambda element : element[0])
    rooms = []
    for start,end in book_times:
        if not rooms:
            rooms.append(end)
            continue
        for i, r in enumerate(rooms):
            if r <= start:
                rooms[i] = end
                break
        else:
            rooms.append(end)
        rooms.sort()
    print(rooms)

    return len(rooms)
