import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import FormInput from './FormInput.jsx'
import { Divider } from 'primereact/divider'
import ViewAnswers from './ViewAnswers.jsx'

const CreatePoll = () => {
    const [answersArray, setAnswersArray] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        setValue
    } = useForm({
        defaultValues: {
            title: '',
            answer: ''
        }
    })
    console.log(answersArray)
    const onSubmit = (data) => console.log(data)
    return (
        <div className='flex align-items-center justify-content-center w-full rounded '>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='surface-card px-4 pb-4 shadow-2 border-round w-full lg:w-6'
            >
                <h5 className='text-2xl'>Create your poll</h5>
                <FormInput
                    register={register}
                    value='title'
                    LabelText='Poll title/question'
                    inputId='title'
                    error={errors.title?.message}
                />
                <Divider align='center'>
                    <span className='text-lg px-3 py-2 font-medium'>
                        Add your answers below
                    </span>
                </Divider>
                <div className='flex w-full justify-content-center align-items-center border gap-3'>
                    <FormInput
                        register={register}
                        value='answer'
                        LabelText='Poll answers'
                        inputId='answer'
                        error={errors.title?.message}
                        cnInput='w-full'
                    />

                    <Button
                        onClick={() => {
                            if (getValues('answer') != '') {
                                setAnswersArray((prev) => {
                                    const obj = {}
                                    obj.answer = getValues('answer')
                                    return [...prev, obj]
                                })
                                setValue('answer', '', { shouldTouch: true })
                            } else {
                                console.log('null field')
                            }
                        }}
                        label='Add answer'
                        icon='pi pi-check'
                        size='small'
                        className='mt-2'
                        type='button'
                    />
                </div>

                <div>
                    {answersArray.length > 0 && (
                        <ViewAnswers data={answersArray} />
                    )}
                </div>
                <div className='w-full flex justify-content-center mt-5'>
                    <Button label='Create Poll' className='w-5' raised />
                </div>
            </form>
        </div>
    )
}

export default CreatePoll
