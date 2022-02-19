export const pastYearsAgo = (years: number, date = new Date()) => {
    date.setFullYear(date.getFullYear() - years);
    return date;
}
