import React from 'react'

import { InputNumber } from 'primereact/inputnumber'

const FormInputNum = ({
    setTimeAmount,
    timeAmount,
    setValue,
    value,
    register,
    inputId,
    required = 'This is required'
}) => {
    const setTimerFN = (e) => {
        let value = e.target.value
        if (value < 1) value = 1
        console.log(value)
        setTimeAmount(value)
    }

    return (
        <React.Fragment>
            <InputNumber
                id={inputId}
                inputId='integeronly'
                value={timeAmount}
                onValueChange={(e) => setTimerFN(e)}
                className='max-w-5rem'
            />
        </React.Fragment>
    )
}

export default FormInputNum
