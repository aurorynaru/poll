import {
    getYear,
    getMonth,
    getDate,
    getMinutes,
    getHours,
    getSeconds
} from 'date-fns'

export const dateConvert = (expDate) => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const month = months[getMonth(expDate)]
    const day = getDate(expDate)
    const year = getYear(expDate)
    let hours = getHours(expDate)
    const minutes = getMinutes(expDate)
    const seconds = getSeconds(expDate)
    const ampm = hours >= 12 ? 'PM' : 'AM'

    //Convert to 12-hour time format
    if (hours > 12) {
        hours -= 12
    }

    const formattedDate = `${month} ${day} ${year} ${hours}:${minutes}:${seconds} ${ampm}`

    return formattedDate
}
