import React, { useEffect, useState } from 'react'
import AnswerComponent from '../components/AnswerComponent'
import { ipAddress } from '../address'
import { useParams } from 'react-router-dom'

const VotePage = () => {
    const { code } = useParams()
    const [totalVotes, setTotalVotes] = useState(0)
    const [ansElement, setAnsElement] = useState(null)
    const [answerArr, setAnswerArr] = useState([])
    const [pollArr, setPollArr] = useState([])

    // const answerArr = [
    //     {
    //         id: 1,
    //         votes: 200,
    //         answer: 'Sats1'
    //     },
    //     {
    //         id: 2,
    //         votes: 437,
    //         answer: 'Sats2'
    //     },
    //     {
    //         id: 3,
    //         votes: 640,
    //         answer: 'Sats3'
    //     },
    //     {
    //         id: 4,
    //         votes: 177,
    //         answer: 'Sats4'
    //     }
    // ]

    useEffect(() => {
        const getPollFn = async () => {
            const res = await fetch(`${ipAddress}/poll/${code}`)
            const resData = await res.json()
            if (resData) {
                setAnswerArr(resData.options)
                setPollArr(resData.poll)
            }
        }

        getPollFn()
    }, [code])

    //edit
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

    useEffect(() => {
        let sub = true

        if (sub) {
            const answerElement = answerArr.map((answer) => {
                return (
                    <div key={answer.id} className='flex flex-column gap-2'>
                        <AnswerComponent
                            key={answer.id}
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
    }, [answerArr])
    console.log(pollArr)
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
