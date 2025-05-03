import dayjs from "dayjs";
import { DATE_TYPE } from "./utils/Constants";

export const FilterDateFormatter=( formatter,compareDate, bDay)=>{
    return compareDate.format(formatter) === bDay.format(formatter)
}

export const getDOB = (date) => {
    const today = dayjs().startOf(DATE_TYPE.DAY);
    const birthday = dayjs(date).startOf(DATE_TYPE.DAY);

    const thisYear = today.year();
    let nextBirthday = birthday.year(thisYear).startOf(DATE_TYPE.DAY);

    const daysLeft = nextBirthday.diff(today, DATE_TYPE.DAY);
    return daysLeft;
  };