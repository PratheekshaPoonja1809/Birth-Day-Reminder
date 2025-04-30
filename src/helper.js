export const FilterDateFormatter=( formatter,compareDate, bDay)=>{
    return compareDate.format(formatter) === bDay.format(formatter)
}