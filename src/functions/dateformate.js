const allMonths = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];


export const toDateString = (dateISO, withTime = false) => {
    const date = new Date(dateISO);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthString = allMonths[month];

    let mainDate = day+" "+monthString + " " + year;

    if(withTime){
        let ampm = "AM";
        let hour = date.getHours();
        let minute = date.getMinutes();

        if(hour > 12){
            hour = hour - 12;
            ampm = "PM"
        }

        mainDate += " " + hour+":"+minute+" "+ampm;
    }

    return mainDate;
} 

const allDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
export const getDayByNumber = (dayIdx) => {
    return allDays[dayIdx]
}