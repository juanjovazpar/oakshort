export const isFutureDate = (dateStr: string): boolean => {
  const date = new Date(dateStr).getTime();
  const now = Date.now();

  return date > now;
};
