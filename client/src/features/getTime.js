import { dateConvert } from './dateConvert'
import { formatISO } from 'date-fns'

export const getTime = (currentDate, timeStamp, time) => {
    switch (timeStamp) {
        case 'Hours':
            currentDate.setHours(currentDate.getHours() + time)
            break
        case 'Minutes':
            currentDate.setMinutes(currentDate.getMinutes() + time)
            break
        case 'Days':
            currentDate.setDate(currentDate.getDate() + time)
            break
        case 'Seconds':
            currentDate.setSeconds(currentDate.getSeconds() + time)
            break
        default:
            break
    }

    const getDate = dateConvert(currentDate)

    function sqlDateTime(userDateString) {
        const sqlDatetime = formatISO(new Date(userDateString))

        return sqlDatetime
    }
    // Example usage

    // const options = {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //     hour12: false
    // }
    // const formattedDatetime = currentDate
    //     .toLocaleString('en-US', options)
    //     .replace(/[/]/g, '-')

    // const timePart = formattedDatetime
    //     .split(',')[1]
    //     .trim()
    //     .replace(/(AM|PM)/, '')
    // const finalFormattedDatetime = `${
    //     formattedDatetime.split(',')[0]
    // }, ${timePart}`.replace(',', '')

    // const year = finalFormattedDatetime.slice(6, 10)
    // const day = finalFormattedDatetime.slice(3, 5)
    // const month = finalFormattedDatetime.slice(0, 2)
    // const timeFormat = finalFormattedDatetime.slice(10)
    const isoDateString = sqlDateTime(currentDate)

    const data = {
        dueTime: isoDateString,
        dueTimeDisplay: getDate
    }

    return data
}
