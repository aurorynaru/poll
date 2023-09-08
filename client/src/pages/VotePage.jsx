import React, { useEffect, useState } from 'react'
import AnswerComponent from '../components/AnswerComponent'

const VotePage = () => {
    // const asnwer = 'Sats'
    // const id = 1
    // const votes = 743
    // const totalVotes = 4681

    const [totalVotes, setTotalVotes] = useState(0)
    const [ansElement, setAnsElement] = useState(null)

    const answerArr = [
        {
            id: 1,
            votes: 200,
            answer: 'Sats1'
        },
        {
            id: 2,
            votes: 437,
            answer: 'Sats2'
        },
        {
            id: 3,
            votes: 640,
            answer: 'Sats3'
        },
        {
            id: 4,
            votes: 177,
            answer: 'Sats4'
        }
    ]
    //edit
    useEffect(() => {
        let sub = true

        const getTotal = () => {
            const totalAmount = answerArr.reduce((prev, answer) => {
                return prev + answer.votes
            }, 0)

            setTotalVotes(totalAmount)
        }

        if (sub) {
            getTotal()
        }

        return () => {
            sub = false
        }
    }, [])

    useEffect(() => {
        let sub = true

        if (sub && totalVotes) {
            const answerElement = answerArr.map((answer) => {
                return (
                    <div key={answer.id} className='flex flex-column gap-2'>
                        <AnswerComponent
                            key={answer.id}
                            answer={answer.answer}
                            value={answer.votes}
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
    }, [totalVotes])

    return (
        <div className='flex flex-column align-items-center justify-content-center w-full rounded'>
            <div className='sat'>
                <h1>poll title</h1>
            </div>
            <div className='w-full'>{ansElement}</div>
        </div>
    )
}

export default VotePage
