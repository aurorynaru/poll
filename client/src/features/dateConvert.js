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

    const date = new Date(expDate)

    const month = months[date.getUTCMonth()]
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    let hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const seconds = date.getUTCSeconds()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    // Convert to 12-hour time format
    if (hours > 12) {
        hours -= 12
    }

    const formattedDate = `${month} ${day} ${year} ${hours}:${minutes}:${seconds} ${ampm}`

    return formattedDate
}
