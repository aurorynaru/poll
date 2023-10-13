import React, { useEffect, useMemo } from 'react'
import { dateConvert } from '../features/dateConvert'

function CountdownTimer({
    expirationDate,
    setTimeRemaining,
    timeRemaining,
    setIsExpired,
    isExpired
}) {
    function calculateTimeRemaining() {
        const currentTime = new Date().getTime()
        const expirationTime = new Date(expirationDate).getTime()
        const timeDifference = expirationTime - currentTime

        if (timeDifference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        const Seconds = Math.floor((timeDifference / 1000) % 60)
        const Minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
        const Hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
        const Days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

        return { Days, Hours, Minutes, Seconds }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining())
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [expirationDate])

    const counterElement = useMemo(() => {
        const time = timeRemaining
        const expDate = dateConvert(expirationDate)
        const timeArr = []
        for (const val in time) {
            const letter = val.charAt(0).toLocaleLowerCase()
            if (time[val] > 0 && val != 'Seconds') {
                timeArr.push({ [letter]: time[val] })
            }

            if (val === 'Seconds') {
                if (time[val] === 0 || time[val] > 0) {
                    timeArr.push({ [letter]: time[val] })
                }
            }
        }
        if (timeArr.length < 1) {
            if (!isExpired) {
                setIsExpired(true)
            }
            return (
                <h3 className='p-0 m-0 text-primary'>
                    Deactivated on:{' '}
                    <span className='text-secondary'>{expDate}</span>
                </h3>
            )
        } else {
            return timeArr.map((elem, index) => {
                const keys = Object.keys(elem)[0]
                const value = Object.values(elem)[0]
                return (
                    <span key={index} className='text-lg px-1 '>
                        {value + '' + keys}
                    </span>
                )
            })
        }
    }, [timeRemaining])

    return <div className='flex'>{counterElement}</div>
}

export default CountdownTimer
