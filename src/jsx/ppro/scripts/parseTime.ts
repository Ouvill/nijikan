// parse time string to Time object. timeString format: hh:mm:ss:fffff
export const parseTime = (timeString: string) => {
    const array = timeString.split(":");
    let seconds = 0;
    seconds += parseInt(array[0]) * 60 * 60;
    seconds += parseInt(array[1]) * 60;
    seconds += parseInt(array[2]);
    seconds += parseInt(array[3]) / 10 ** array[3].length;

    const time = new Time();
    time.seconds = seconds;
    return time;
};