import React from 'react'
import Error from './Error'
import { InputText } from 'primereact/inputtext'

const formInput = ({
    value,
    LabelText,
    inputId,
    error,
    register,
    cnInput = '',
    cnLabel = ''
}) => {
    return (
        <div className='field p-fluid '>
            <label htmlFor={inputId} className={` font-medium ${cnLabel}`}>
                {LabelText}
            </label>

            <InputText
                {...register(`${value}`)}
                id={inputId}
                type='text'
                className={`p-inputtext p-component  ${cnInput}`}
            />

            {error && <Error message={'This field is required'} />}
        </div>
    )
}
export default formInput
