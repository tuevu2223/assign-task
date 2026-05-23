import dayjs from "dayjs";

export const formatDateTime = (
  date,
  format = "DD/MM/YYYY HH:mm"
) => {
  if (!date) return "--";

  return dayjs(date).format(format);
};