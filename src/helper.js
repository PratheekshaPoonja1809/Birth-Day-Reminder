import dayjs from "dayjs";
import { DATE_TYPE, MESSAGES } from "./utils/Constants";

export const FilterDateFormatter = (formatter, compareDate, bDay) => {
  return compareDate.format(formatter) === bDay.format(formatter);
};

export const getDOB = (date) => {
  const today = dayjs().startOf(DATE_TYPE.DAY);
  const birthday = dayjs(date).startOf(DATE_TYPE.DAY);

  const thisYear = today.year();
  let nextBirthday = birthday.year(thisYear).startOf(DATE_TYPE.DAY);

  const daysLeft = nextBirthday.diff(today, DATE_TYPE.DAY);
  return daysLeft;
};

export const genrateUniqueID = () => {
  const uniqueId = `id-${Date.now()}${Math.random().toString().slice(2, 8)}`;
  return uniqueId;
};

export const computeDaysPending = (date) => {
  const daysLeft = getDOB(date);
  if (daysLeft > 0) {
    return `⏳ ${daysLeft} day(s) to go`;
  } else if (daysLeft === 0) {
    return MESSAGES.CELEBRATE;
  }
  return `${Math.abs(daysLeft)} day(s) late to the party!`;
};

export const sendMail = (detail) => {
  const daysLeft = getDOB(detail.dob);
  const message =
    daysLeft < 0
      ? MESSAGES.BELATED_WISHES
      : daysLeft > 0
      ? MESSAGES.ADVANCE_WISHES
      : MESSAGES.BIRTHDAY_WISHES;

  const subject = encodeURIComponent(MESSAGES.CELEBRATE_MSG);
  const body = encodeURIComponent(`Hi ${detail.name},

    ${message}

    Cheers!
  `);

  window.location.href = `mailto:${
    detail?.email ?? ""
  }?subject=${subject}&body=${body}`;
};
