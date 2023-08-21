import React from 'react'
import { useForm } from 'react-hook-form'

const CreatePoll = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()
    const onSubmit = (data) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('title', {
                    required: 'Invalid name.',
                    minLength: {
                        value: 4,
                        message: 'Minimum length is 4 characters.'
                    }
                })}
                placeholder='Poll title'
            />
            {errors.title?.message && (
                <div
                    className='p-inline-message p-component p-inline-message-error'
                    role='alert'
                    aria-live='polite'
                >
                    <span className='p-inline-message-text'>
                        This field is required
                    </span>
                </div>
            )}
            <input type='submit' />
        </form>
    )
}

export default CreatePoll
