export default function formatDate(dateString: string): string {
    //format date to Month Day, Year, and time to HH:MM AM/PM
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString(undefined, options);
}