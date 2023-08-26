import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import FormInput from './FormInput.jsx'
import { Divider } from 'primereact/divider'
import ViewAnswers from './ViewAnswers.jsx'
import { v4 as uuidv4 } from 'uuid'
import Error from './Error.jsx'
import { ipAddress } from '../address.js'
const CreatePoll = () => {
    const [answersArray, setAnswersArray] = useState([])
    const [pollAnswer, setPollAnswer] = useState('')
    const [pollTitle, setPollTitle] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        setValue,
        setError,
        clearErrors
    } = useForm({
        defaultValues: {
            title: '',
            answer: '',
            answerAmount: 0
        }
    })

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            setPollAnswer(value.answer)
            setPollTitle(value.pollTitle)
        })
        return () => subscription.unsubscribe()
    }, [watch])

    const onSubmit = async (data) => {
        setValue('answerAmount', answersArray.length)
        const answersLength = getValues('answerAmount')
        if (!answersLength) {
            setError('answerAmount', {
                type: 'custom',
                message: 'Put at least 1 answer'
            })
        } else {
            //  const { title, user_id, expiration, options } = req.body
            const values = {}

            // const res = await fetch(`${ipAddress}/create`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(values)
            // })
        }
    }

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
                        error={errors.answer?.message}
                        required={false}
                        cnInput='w-full'
                    />

                    <Button
                        onClick={() => {
                            if (getValues('answer') != '') {
                                setAnswersArray((prev) => {
                                    const obj = {}
                                    obj.answer = pollAnswer
                                    obj.id = uuidv4()

                                    return [...prev, obj]
                                })

                                setValue('answer', '')
                                clearErrors('answerAmount')
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
                <div className='flex justify-content-center'>
                    {errors.answerAmount?.message && (
                        <Error message={errors.answerAmount?.message} />
                    )}
                </div>
                <div>
                    {answersArray.length > 0 && (
                        <ViewAnswers
                            data={answersArray}
                            setAnswersArray={setAnswersArray}
                        />
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
