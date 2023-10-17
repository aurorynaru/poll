import React, { useEffect, useMemo } from 'react'
import { dateConvert } from '../features/dateConvert'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
dayjs.extend(duration)
dayjs.extend(utc)
function CountdownTimer({ expirationDate, setTimeRemaining, timeRemaining }) {
    const calculateTimeRemaining = async () => {
        const currentTime = dayjs().utc(true)
        const expirationTime = dayjs(expirationDate).utc(true)

        if (currentTime.isAfter(expirationTime)) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        const timeDifference = dayjs.duration(expirationTime.diff(currentTime))

        const days = timeDifference.days()
        const hours = timeDifference.hours()
        const minutes = timeDifference.minutes()
        const seconds = timeDifference.seconds()

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
                setTimeRemaining(await calculateTimeRemaining())
            }
        }

        intervalId = setInterval(updateRemainingTime, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [expirationDate, timeRemaining])
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
