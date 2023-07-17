export const ConverDecimalHours = (hour) =>{
    let date = new Date(0, 0);
    date.setSeconds(Number(hour) * 60 * 60);
    return date.toTimeString().slice(0, 5);
}