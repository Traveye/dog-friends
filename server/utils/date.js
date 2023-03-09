//this function will convert the date.now to a string formated to mm/dd/yy at hh:mm

export default function dateToString(timestamp) {
    const newDate = new Date(timestamp);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();
    return `${month}/${day}/${year} at ${hour}:${minutes}`;
}