import React, { useEffect, useMemo } from 'react'
import { dateConvert } from '../features/dateConvert'
import { differenceInMilliseconds, getTime } from 'date-fns'
function CountdownTimer({ expirationDate, setTimeRemaining, timeRemaining }) {
    const calculateTimeRemaining = () => {
        const currentTime = getTime(new Date())
        const expirationTime = getTime(new Date(expirationDate))

        if (currentTime > expirationTime) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        const timeDifference = differenceInMilliseconds(
            expirationTime,
            currentTime
        )

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

        return { days, hours, minutes, seconds }
    }

    useEffect(() => {
        let intervalId

        const updateRemainingTime = async () => {
            if (
                timeRemaining.days === 0 &&
                timeRemaining.hours === 0 &&
                timeRemaining.minutes === 0 &&
                timeRemaining.seconds === 0
            ) {
                clearInterval(intervalId)
            } else {
                setTimeRemaining(calculateTimeRemaining())
            }
        }

        intervalId = setInterval(updateRemainingTime, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [expirationDate, timeRemaining])
    const counterElement = useMemo(() => {
        const time = timeRemaining

        const expDate = dateConvert(new Date(expirationDate))

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
