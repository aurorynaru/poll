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
    return (
        <React.Fragment>
            <InputNumber
                id={inputId}
                inputId='integeronly'
                value={timeAmount}
                onValueChange={(e) => setTimeAmount(e.value)}
                className='max-w-5rem'
            />
        </React.Fragment>
    )
}

export default FormInputNum
