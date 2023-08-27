import React from 'react'

import { InputNumber } from 'primereact/inputnumber'

const FormInputNum = ({
    value,
    register,
    inputId,
    required = 'This is required'
}) => {
    return (
        <React.Fragment>
            <InputNumber
                {...register(`${value}`, { required: required })}
                id={inputId}
                className='max-w-5rem'
                placeholder=''
            />
        </React.Fragment>
    )
}

export default FormInputNum
