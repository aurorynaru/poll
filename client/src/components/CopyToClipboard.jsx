import React, { useState } from 'react'

function CopyToClipboard({ code = 'ABC123' }) {
    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(code)
        } catch (error) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <div className='flex align-items-center '>
            <button
                className='text-lg text-white bg-primary font-medium border-none hover:bg-white hover:text-primary '
                onClick={handleCopyClick}
            >
                Copy code: {code} <span className='pi pi-copy'></span>
            </button>
        </div>
    )
}

export default CopyToClipboard
