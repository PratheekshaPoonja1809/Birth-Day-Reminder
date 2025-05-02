import dayjs from "dayjs";

export const FilterDateFormatter=( formatter,compareDate, bDay)=>{
    return compareDate.format(formatter) === bDay.format(formatter)
}

export const getDOB = (date) => {
    const today = dayjs().startOf("day");
    const birthday = dayjs(date).startOf("day");

    const thisYear = today.year();
    let nextBirthday = birthday.year(thisYear).startOf("day");

    const daysLeft = nextBirthday.diff(today, "day");
    return daysLeft;
  };