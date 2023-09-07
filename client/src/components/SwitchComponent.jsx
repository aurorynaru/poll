import React, { useState } from 'react'
import { InputSwitch } from 'primereact/inputswitch'

const SwitchComponent = ({ checked, setChecked }) => {
    return (
        <div className='card flex justify-content-center'>
            <InputSwitch
                checked={checked}
                onChange={(e) => setChecked(e.value)}
            />
        </div>
    )
}

export default SwitchComponent
