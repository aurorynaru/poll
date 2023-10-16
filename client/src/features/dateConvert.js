import dayjs from 'dayjs'
import toObject from 'dayjs/plugin/toObject'
import utc from 'dayjs/plugin/utc'
dayjs.extend(toObject)
dayjs.extend(utc)
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

    const date = dayjs(expDate).utc(true).toObject()

    const month = months[date.months]
    const day = date.date
    const year = date.years
    let hours = date.hours
    const minutes = date.minutes
    const seconds = date.seconds
    const ampm = hours >= 12 ? 'PM' : 'AM'

    //Convert to 12-hour time format
    if (hours > 12) {
        hours -= 12
    }

    const formattedDate = `${month} ${day} ${year} ${hours}:${minutes}:${seconds} ${ampm}`

    return formattedDate
}
