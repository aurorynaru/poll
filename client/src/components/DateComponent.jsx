import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import Error from './Error'
import FormInputNum from './FormInputNum'

const DateComponent = ({
    error,
    inputId,
    register,
    value,
    selectedTime,
    setSelectedTime,
    setValue,
    timeAmount,
    setTimeAmount
}) => {
    const time = [
        { name: 'Days' },
        { name: 'Hours' },
        { name: 'Minutes' },
        { name: 'Seconds' }
    ]

    return (
        <div className='flex flex-column gap-2'>
            <label className={` font-medium`}>Expiration</label>
            <div className='card flex flex-wrap p-fluid w-full align-items-center'>
                <div className='p-inputgroup flex-1'>
                    <FormInputNum
                        setTimeAmount={setTimeAmount}
                        timeAmount={timeAmount}
                        setValue={setValue}
                        value={value}
                        register={register}
                        inputId={inputId}
                    />

                    <Dropdown
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.value)}
                        options={time}
                        optionLabel='name'
                        placeholder='Select one'
                        className='max-w-10rem text w-fit'
                    />
                </div>
            </div>
            {error && <Error message={'This field is required'} />}
        </div>
    )
}

export default DateComponent
