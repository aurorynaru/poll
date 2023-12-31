import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { Skeleton } from 'primereact/skeleton'

const AnswerComponent = ({
    value,
    totalVotes,
    answer,
    isSelected,
    setIsSelected,
    index,
    answerId,
    setOptionId,
    saveVoteDB,
    disableButton = false
}) => {
    const [elem, setElem] = useState()
    const [percentageData, setPercentageData] = useState(0)

    const valueTemplate = (value) => {
        return (
            <React.Fragment>
                <span className='text-sm'>{value}%</span>
            </React.Fragment>
        )
    }

    const setPercentage = () => {
        let percentage = ((value / totalVotes) * 100).toFixed(0)

        if (isNaN(percentage) || totalVotes === 0) {
            percentage = 0
        } else {
            percentage = parseInt(percentage)
        }

        return percentage
    }

    useEffect(() => {
        setPercentageData(setPercentage())
    }, [value, totalVotes])

    useEffect(() => {
        const setAnsElem = () => {
            return (
                <>
                    <div className='flex flex-column mb-3'>
                        <Button
                            disabled={disableButton}
                            className={`outline hover:bg-primary text-md  ${
                                isSelected == answerId ? 'bg-primary' : ''
                            }`}
                            label={answer}
                            text
                            raised
                            tooltip={`click to vote ${answer}`}
                            tooltipOptions={{ position: 'top' }}
                            onClick={() => {
                                if (isSelected != answerId) {
                                    setIsSelected(answerId)
                                    saveVoteDB(answerId)
                                    setOptionId(answerId)
                                } else {
                                }
                            }}
                        />
                    </div>
                    <div className='flex  flex-column mb-3'>
                        <ProgressBar
                            value={percentageData}
                            displayValueTemplate={valueTemplate}
                        ></ProgressBar>
                    </div>
                </>
            )
        }

        setElem(setAnsElem())
    }, [index, isSelected, totalVotes, disableButton, percentageData])
    //edit

    return (
        <div className='card flex-column justify-content-center gap-2'>
            {elem}
        </div>
    )
}

export default AnswerComponent
