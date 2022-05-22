export function asMonthDay(date: Date): string {
    const month = correctMonth(date.getUTCMonth());
    const day = correctDay(date.getUTCDate());
    return `${month}/${day}`
}

function correctMonth(monthNumber: number) : string {
    const correctedMonth = monthNumber + 1;
    return correctedMonth <10 ? `0${correctedMonth}` : correctedMonth.toString();
}

function correctDay(day: number) : string {
    return day <10 ? `0${day}` : day.toString();
}