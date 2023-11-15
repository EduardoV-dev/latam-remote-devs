export const formatDate = (date: string) =>
    new Intl.DateTimeFormat('es').format(new Date(date));
