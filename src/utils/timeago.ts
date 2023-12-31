/* eslint-disable no-else-return */

export const MONTH_NAMES = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

export const formatHoursTo24 = (hours: number, minutes: number): string => {
    if (hours === 0 && minutes === 0) return '';

    const isPM: boolean = hours > 12;
    const formattedHours: number = isPM ? hours - 12 : hours;
    const newMinutes: string = `${minutes < 10 ? '0' : ''}${minutes}`;

    return `${formattedHours}:${newMinutes} ${isPM ? 'PM' : 'AM'}`;
};

const getFormattedDate = (
    date: Date,
    prefix?: string,
    hideYear: boolean = false,
) => {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();

    const minutes: number = date.getMinutes();

    if (prefix) return `${prefix} - ${formatHoursTo24(hours, minutes)}`;

    return `${day} de ${month} ${
        !hideYear ? `de ${year}` : ''
    } - ${formatHoursTo24(hours, minutes)}`;
};

export const timeAgo = (dateParam: string) => {
    const date = new Date(dateParam);

    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000

    const today = new Date();
    const yesterday = new Date(today.getTime() - DAY_IN_MS);

    const seconds = Math.round((today.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);

    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();

    if (seconds < 5) {
        return 'Hace unos momentos';
    } else if (seconds < 60) {
        return `Hace ${seconds} segundos `;
    } else if (seconds < 90) {
        return 'Hace un minuto';
    } else if (minutes < 60) {
        return `Hace ${minutes} minutos`;
    } else if (isToday) {
        return getFormattedDate(date, 'Hoy'); // Today @ 10:20
    } else if (isYesterday) {
        return getFormattedDate(date, 'Ayer'); // Yesterday @ 10:20
    } else if (isThisYear) {
        return getFormattedDate(date, '', true); // 10. January @ 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
};
