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

    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    // Convert to 12-hour time format
    if (hours > 12) {
        hours -= 12
    }

    const formattedDate = `${month} ${day} ${year} ${hours}:${minutes} ${ampm}`
    return formattedDate
}
