const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
}

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

    return currentDate.toLocaleString('en-CA', options)
}
