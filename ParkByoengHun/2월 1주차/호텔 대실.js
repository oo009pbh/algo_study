function solution(book_time) {
    let rooms = [];

    for (let [index, time] of book_time.entries()) {
        let start = timeByString(time[0]);
        let end = timeByString(time[1]);

        book_time[index][0] = start;
        book_time[index][1] = end + 10;
    }

    book_time.sort((a, b) => a[0] - b[0]);

    for (let time of book_time) {
        let [s, e] = time;
        let isRoomChange = false;
        for (let [index, room] of rooms.entries() ) {
            if (room <= s) {
                isRoomChange = true;
                rooms[index] = e;
            }
        }
        if (!isRoomChange) {
            rooms.push(e);
        }
        rooms.sort((a, b) => b - a);
    }

    return rooms.length;
}

const timeByString = (date) => {
    const [hour, miniute] = date.split(":");

    return Number(hour) * 60 + Number(miniute);
}

console.log(solution([["15:00", "17:00"], ["16:40", "18:20"], ["14:20", "15:20"], ["14:10", "19:20"], ["18:20", "21:20"]]))