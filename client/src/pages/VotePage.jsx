import React, { useEffect, useMemo, useState } from 'react'
import AnswerComponent from '../components/AnswerComponent'
import { ipAddress } from '../address'
import { useParams } from 'react-router-dom'
import { debounce } from '../features/debounce'
import socketIOClient from 'socket.io-client'
import CountdownTimer from '../components/CountdownTimer'
import CopyToClipboard from '../components/CopyToClipboard'

const VotePage = () => {
    const { code } = useParams()
    const [totalVotes, setTotalVotes] = useState(0)
    const [ansElement, setAnsElement] = useState(null)
    const [answerArr, setAnswerArr] = useState([])
    const [pollArr, setPollArr] = useState([])
    const [isVoted, setIsVoted] = useState(true)
    const [optionId, setOptionId] = useState(null)
    const [isExpired, setIsExpired] = useState(null)
    const [expirationTime, setExpirationTime] = useState(null)
    const [timeRemaining, setTimeRemaining] = useState({
        Days: 31,
        Hours: 24,
        Minutes: 60,
        Seconds: 60
    })

    const [isSelected, setIsSelected] = useState(null)

    const saveVoteDB = debounce((answerId) => {
        saveVoteFn({
            userId: pollArr.user_id,
            optionsId: answerId,
            pollId: pollArr.id,
            code: pollArr.code
        })
    }, 300)

    const getTotal = () => {
        const totalAmount = answerArr.reduce((prev, answer) => {
            return prev + answer.option_votes
        }, 0)

        setTotalVotes(totalAmount)
    }

    const getPollFn = async () => {
        const res = await fetch(`${ipAddress}/poll/${code}`)
        const resData = await res.json()
        if (resData) {
            setIsVoted(resData.selectedAnsId)
            setAnswerArr(resData.options)
            setPollArr(resData.poll)
            setExpirationTime(resData.poll.expiration)
            if (!isExpired) {
                setIsExpired(resData.isExpired === 1 ? true : false)
            }
        }
    }

    const saveVoteFn = async (data) => {
        try {
            const res = await fetch(`${ipAddress}/poll/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (res.status != 200) {
                // Handle successful response
                const errorResponse = await res.json()
                console.error('Error:', errorResponse.error)
            }
        } catch (error) {
            console.error('Network error:', error)
        }
    }

    useEffect(() => {
        const socket = socketIOClient(`${ipAddress}`)

        socket.on('pollUpdate', (updatedPollData) => {
            setIsVoted(updatedPollData.selectedAnsId)
            setAnswerArr(updatedPollData.options)
            setPollArr(updatedPollData.poll)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        getPollFn()
    }, [])

    useEffect(() => {
        let sub = true

        if (sub && answerArr) {
            getTotal()
        }

        return () => {
            sub = false
        }
    }, [answerArr])

    const countdown = useMemo(() => {
        return (
            <React.Fragment>
                <CountdownTimer
                    isExpired={isExpired}
                    setIsExpired={setIsExpired}
                    expirationDate={expirationTime}
                    timeRemaining={timeRemaining}
                    setTimeRemaining={setTimeRemaining}
                />
            </React.Fragment>
        )
    }, [expirationTime, timeRemaining])

    const answerElement = useMemo(() => {
        return answerArr.map((answer, index) => {
            return (
                <div key={answer.id} className='flex flex-column gap-2'>
                    <AnswerComponent
                        disabled={isExpired ? true : false}
                        setOptionId={setOptionId}
                        answerId={answer.id}
                        saveVoteDB={saveVoteDB}
                        index={index}
                        isSelected={isVoted ? isVoted : isSelected}
                        setIsSelected={setIsSelected}
                        answer={answer.poll_option}
                        value={answer.option_votes}
                        totalVotes={totalVotes}
                    />
                </div>
            )
        })
    }, [answerArr, isSelected, optionId, totalVotes, isExpired])

    useEffect(() => {
        setAnsElement(answerElement)
    }, [answerArr, totalVotes])

    return (
        <div className='flex flex-column align-items-center justify-content-center w-full rounded'>
            <div className='flex flex-column justify-content-center align-items-center gap-4'>
                {countdown}
                <CopyToClipboard code={pollArr.code} />
            </div>
            <div className='sat'>
                <h1>{pollArr.title}</h1>
            </div>
            <div className='w-full'>{ansElement}</div>
        </div>
    )
}

export default VotePage
