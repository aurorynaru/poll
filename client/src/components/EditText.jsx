import React from 'react'
import { InputText } from 'primereact/inputtext'
const EditText = ({ options }) => {
    return (
        <InputText
            type='text'
            value={options.value}
            onChange={(e) => options.editorCallback(e.target.value)}
            className='w-auto'
        />
    )
}

export default EditText
