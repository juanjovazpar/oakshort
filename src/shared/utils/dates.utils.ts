export const compareDates = (date1: number, date2: number): number =>
  date1 > date2 ? 1 : date1 < date2 ? -1 : 0;

export const isFutureDate = (dateStr: string | Date): boolean => {
  const date = new Date(dateStr).getTime();
  const now = Date.now();

  return compareDates(date, now) === 1;
};

export const isPastDate = (dateStr: string | Date): boolean => {
  const date = new Date(dateStr).getTime();
  const now = Date.now();

  return compareDates(date, now) === -1;
};
