import React, { useState } from 'react'
import { ToggleButton } from 'primereact/togglebutton'
import { ProgressBar } from 'primereact/progressbar'

const AnswerComponent = ({ answer, value, totalVotes, isDisabled = false }) => {
    const percentage = ((value / totalVotes) * 100).toFixed(0)
    const [checked, setChecked] = useState(false)

    const valueTemplate = (value) => {
        return (
            <React.Fragment>
                <span className='text-sm'>{value}%</span>
            </React.Fragment>
        )
    }

    return (
        <div className='card flex-column justify-content-center gap-2'>
            <div className='flex flex-column mb-3'>
                <ToggleButton
                    disabled={isDisabled ? true : false}
                    onLabel={answer}
                    offLabel={answer}
                    onIcon='pi pi-times'
                    offIcon='pi pi-check'
                    checked={checked}
                    onChange={(e) => setChecked(e.value)}
                    className='w-fit hover hover:bg-primary'
                />
            </div>
            <div className='flex  flex-column mb-3'>
                <ProgressBar
                    value={percentage}
                    displayValueTemplate={valueTemplate}
                ></ProgressBar>
            </div>
        </div>
    )
}

export default AnswerComponent
