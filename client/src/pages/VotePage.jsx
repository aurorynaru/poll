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
    const [pivot, setPivot] = useState([])

    const [isSelected, setIsSelected] = useState(null)

    const getPollFn = async () => {
        const res = await fetch(`${ipAddress}/poll/${code}`)
        const resData = await res.json()
        if (resData) {
            setPivot(resData.isVote)
            setAnswerArr(resData.options)
            setPollArr(resData.poll)
        }
    }

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

            console.log(resData)
        } else {
            console.log('Error:', res.status)
        }
    }

    useEffect(() => {
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
            const answerElement = answerArr.map((answer, index) => {
                return (
                    <div key={answer.id} className='flex flex-column gap-2'>
                        <AnswerComponent
                            saveVoteFn={saveVoteFn}
                            index={index}
                            isSelected={isSelected}
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
    }, [answerArr, isSelected])
    // console.log(pollArr)
    //console.log(answerArr)
    // console.log(pivot)
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
