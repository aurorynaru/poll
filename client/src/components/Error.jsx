import React from 'react'

const Error = ({ message }) => {
    return (
        <div className='p-error' role='alert' aria-live='polite'>
            <span className='p-inline-message-text'>{message}</span>
        </div>
    )
}

export default Error
