export default class DateHelper {
    public static stringToDate(date: string): Date {
        const [year, month, day] = date.split('-').map(Number);
        return new Date(year, month, day);
    }
}