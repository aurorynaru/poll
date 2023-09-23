import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { debounce } from '../features/debounce'

const AnswerComponent = ({
    value,
    totalVotes,
    answer,
    isSelected,
    setIsSelected,
    index,
    saveVoteFn
}) => {
    const percentage = ((value / totalVotes) * 100).toFixed(0)
    const [elem, setElem] = useState()
    const valueTemplate = (value) => {
        return (
            <React.Fragment>
                <span className='text-sm'>{value}%</span>
            </React.Fragment>
        )
    }

    const debounceFn = debounce(() => {
        const data = {
            userId: 'testUserId',
            optionsId: 'testOptionsId',
            pollId: 'testPollId',
            code: 'testcode'
        }
        saveVoteFn(data)
    }, 300)

    useEffect(() => {
        const setAnsElem = () => {
            return (
                <>
                    <div className='flex flex-column mb-3'>
                        <Button
                            className={`outlined hover:bg-primary text-md  ${
                                isSelected === index ? 'bg-primary' : ''
                            }`}
                            label={answer}
                            text
                            raised
                            tooltip={`click to vote ${answer}`}
                            tooltipOptions={{ position: 'top' }}
                            onClick={() => {
                                debounceFn()
                            }}
                        />
                    </div>
                    <div className='flex  flex-column mb-3'>
                        <ProgressBar
                            value={percentage}
                            displayValueTemplate={valueTemplate}
                        ></ProgressBar>
                    </div>
                </>
            )
        }

        setAnsElem()
        setElem(setAnsElem)
    }, [index, isSelected])
    //edit

    return (
        <div className='card flex-column justify-content-center gap-2'>
            {elem}{' '}
        </div>
    )
}

export default AnswerComponent
