export const formatDate = (isoString?: string): string => {
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.getMonth();
    const monthNames = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${day} ${monthNames[month]} ${formattedHours}:${formattedMinutes}`;
};
