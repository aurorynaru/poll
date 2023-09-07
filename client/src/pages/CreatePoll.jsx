import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import FormInput from '../components/FormInput.jsx'
import { Divider } from 'primereact/divider'
import ViewAnswers from '../components/ViewAnswers.jsx'
import { v4 as uuidv4 } from 'uuid'
import Error from '../components/Error.jsx'
import { Message } from 'primereact/message'
import { ipAddress } from '../address.js'
import DateComponent from '../components/DateComponent.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setId } from '../features/user/userSlice'
import { getAddress } from '../middleware/midware'
import { getTime } from '../features/getTime.js'
import SwitchComponent from '../components/SwitchComponent.jsx'

const CreatePoll = () => {
    const [answersArray, setAnswersArray] = useState([])
    const [pollAnswer, setPollAnswer] = useState('')
    const [pollTitle, setPollTitle] = useState('')
    const [timeAmount, setTimeAmount] = useState(1)
    const [selectedTime, setSelectedTime] = useState({ name: 'Hours' })
    const [checked, setChecked] = useState(true)
    const [dueTime, setDueTime] = useState(null)
    const id = useSelector((state) => state.id)
    const token = useSelector((state) => state.token)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
            time: '',
            stamp: '',
            answerAmount: 0
        }
    })

    useEffect(() => {
        let isMounted = true

        const getAddressFn = async () => {
            if (isMounted && !token && !id) {
                const addressRes = await getAddress()

                dispatch(
                    setToken({
                        token: addressRes.token
                    })
                )

                dispatch(
                    setId({
                        id: addressRes.id
                    })
                )
            }
        }

        if (isMounted && !token && !id) {
            getAddressFn()
        }

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date()
            const time = getValues('time')
            const timeStamp = getValues('stamp')
            const dateTimeRes = getTime(currentDate, timeStamp.name, time)

            setDueTime(dateTimeRes)
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        setValue('time', timeAmount)
        setValue('stamp', selectedTime)
        const time = getValues('time')
        if (time) clearErrors('time')
    }, [timeAmount, selectedTime])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            setPollAnswer(value.answer)
            setPollTitle(value.pollTitle)
        })
        return () => subscription.unsubscribe()
    }, [watch])

    const onSubmit = async (data) => {
        setValue('answerAmount', answersArray.length)
        const time = getValues('time')

        const answersLength = getValues('answerAmount')

        if (!answersLength) {
            setError('answerAmount', {
                type: 'custom',
                message: 'Put at least 1 answer'
            })
        }

        if (!time) {
            setError('time', {
                type: 'custom',
                message: 'Put at least 1 answer'
            })
        }

        if (answersLength && time) {
            //  const { title, user_id, expiration, options } = req.body
            clearErrors('time')
            const values = {}
            values.title = data.title
            values.expiration = dueTime
            values.options = answersArray
            values.user_id = id
            if (checked) {
                values.single_vote = 1
            } else {
                values.single_vote = 0
            }
            const res = await fetch(`${ipAddress}/poll/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const resData = await res.json()
            console.log(resData)
        }
    }

    const addAnswer = () => {
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

                <DateComponent
                    setTimeAmount={setTimeAmount}
                    timeAmount={timeAmount}
                    setValue={setValue}
                    register={register}
                    error={errors.time?.message}
                    inputId='time'
                    value='time'
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />
                <div className='mt-2'>
                    {dueTime && <Message severity='warn' text={`${dueTime}`} />}
                </div>

                <Divider align='center'>
                    <div className='flex align-items-center justify-content-center'>
                        <span className='text-lg px-3 py-2 font-medium'>
                            Single answer poll
                        </span>
                        <SwitchComponent
                            checked={checked}
                            setChecked={setChecked}
                        />
                    </div>
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
                        onClick={() => addAnswer()}
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
