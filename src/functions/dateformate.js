const allMonths = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function makeDigitOf(num, digit) {
    if (String(num).length < digit) {
        return String("0").repeat(digit - String(num).length) + num;
    }
    return num;
}
export const toDateString = (dateISO, withTime = false, withDelimeter = false, timeFirst = false) => {
    const date = new Date(dateISO);
    const day = makeDigitOf(date.getDate(), 2);
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthString = allMonths[month];

    let mainDate = day + " " + monthString + " " + year;


    if (withTime) {
        let ampm = "AM";
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (hour > 12) {
            hour = hour - 12;
            ampm = "PM"
        }

        let time = makeDigitOf(hour, 2) + ":" + makeDigitOf(minute, 2) + " " + ampm;

        if (timeFirst) {
            if (withDelimeter) {
                mainDate = time + ", " + mainDate;
            } else {
                mainDate = time + " " + mainDate;
            }
        } else {
            if (withDelimeter) {
                mainDate += "," + time;
            } else {
                mainDate += " " + time;
            }
        }
    }

    return mainDate;
}

const allDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
export const getDayByNumber = (dayIdx) => {
    return allDays[dayIdx]
}