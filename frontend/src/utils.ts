import dayjs from 'dayjs';

export const editTime = (time: string) => dayjs(time).format('DD.MM.YYYY');
