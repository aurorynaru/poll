import React, { useEffect, useState } from 'react'
import AnswerComponent from '../components/AnswerComponent'
import { ipAddress } from '../address'
import { useParams } from 'react-router-dom'
import { debounce } from '../features/debounce'
import socketIOClient from 'socket.io-client'

const VotePage = () => {
    const { code } = useParams()
    const [totalVotes, setTotalVotes] = useState(0)
    const [ansElement, setAnsElement] = useState(null)
    const [answerArr, setAnswerArr] = useState([])
    const [pollArr, setPollArr] = useState([])
    const [isVoted, setIsVoted] = useState(true)
    const [optionId, setOptionId] = useState(null)

    const [isSelected, setIsSelected] = useState(null)

    const getPollFn = async () => {
        const res = await fetch(`${ipAddress}/poll/${code}`)
        const resData = await res.json()
        if (resData) {
            setIsVoted(resData.selectedAnsId)
            setAnswerArr(resData.options)
            setPollArr(resData.poll)
        }
    }
    //checkvote

    useEffect(() => {
        const socket = socketIOClient(ipAddress)

        socket.on('connect', () => {
            console.log('Connected to server')
        })

        socket.on('pollUpdate', (updatedPollData) => {
            setIsVoted(updatedPollData.selectedAnsId)
            setAnswerArr(updatedPollData.options)
            setPollArr(updatedPollData.poll)
        })

        return () => {
            socket.disconnect()
        }
    }, [])
    const saveVoteFn = async (data) => {
        const res = await fetch(`${ipAddress}/poll/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (res.status === 200) {
            const resData = await res.json()
        } else {
            console.log('Error:', res.status)
        }
    }

    useEffect(() => {
        getPollFn()
    }, [code])

    useEffect(() => {
        let sub = true

        const getTotal = () => {
            const totalAmount = answerArr.reduce((prev, answer) => {
                return prev + answer.option_votes
            }, 0)

            setTotalVotes(totalAmount)
        }

        if (sub && answerArr) {
            getTotal()
        }

        return () => {
            sub = false
        }
    }, [answerArr])

    const saveVoteDB = debounce((answerId) => {
        saveVoteFn({
            userId: pollArr.user_id,
            optionsId: answerId,
            pollId: pollArr.id,
            code: pollArr.code
        })
    }, 300)

    useEffect(() => {
        let sub = true

        if (sub) {
            const answerElement = answerArr.map((answer, index) => {
                return (
                    <div key={answer.id} className='flex flex-column gap-2'>
                        <AnswerComponent
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

            setAnsElement(answerElement)
        }

        return () => {
            sub = false
        }
    }, [answerArr, isSelected, optionId])

    return (
        <div className='flex flex-column align-items-center justify-content-center w-full rounded'>
            <div className='sat'>
                <h1>{pollArr.title}</h1>
            </div>
            <div className='w-full'>{ansElement}</div>
        </div>
    )
}

export default VotePage
