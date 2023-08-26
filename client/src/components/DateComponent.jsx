import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'

const DateComponent = () => {
    const [selectedCity, setSelectedCity] = useState(null)
    const [value1, setValue1] = useState(null)
    const cities = [
        { name: 'Days' },
        { name: 'Hours' },
        { name: 'Minutes' },
        { name: 'Seconds' }
    ]

    return (
        <div className='flex flex-column gap-2'>
            <label className={` font-medium`}>Expiration</label>
            <div className='card flex flex-wrap gap-3 p-fluid w-7'>
                <div className='p-inputgroup flex-1'>
                    <InputNumber
                        className='max-w-12rem'
                        inputId='integeronly'
                        value={value1}
                        placeholder='Input a number'
                        onValueChange={(e) => setValue1(e.value)}
                    />

                    <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={cities}
                        optionLabel='name'
                        placeholder='Select one'
                        className='max-w-10rem'
                    />
                </div>
            </div>
        </div>
    )
}

export default DateComponent
