import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRandomName } from '../features/randomName'
import { setUser } from '../features/user/userSlice'
const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [randomName, setRandomName] = useState(null)
    useEffect(() => {
        let isMounted = true
        const getName = async () => {
            const resName = await getRandomName()

            if (isMounted) {
                const res = await fetch('http://localhost:7777/api/address', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const resAddress = await res.json()

                console.log(resAddress)
                dispatch(
                    setUser({
                        user: resName
                    })
                )

                setRandomName(randomName)
            }
        }
        if (!randomName) {
            getName()
        }

        return () => {
            isMounted = false
        }
    }, [randomName])

    const name = useSelector((state) => state.user)
    console.log(name)
    return (
        <div className='flex align-items-center justify-content-center w-full rounded'>
            <div className='surface-card p-4 shadow-2 border-round w-full lg:w-6'>
                <div className='text-center mb-5'>
                    <div className='text-900 text-3xl font-medium mb-5'>
                        Create random polls
                    </div>
                </div>

                <div>
                    <div className='flex align-items-center justify-content-center'>
                        <label
                            htmlFor='code'
                            className='block text-900 font-medium mb-3 text-2xl'
                        >
                            Enter Poll Code:
                        </label>
                    </div>
                    <div className='flex align-items-center justify-content-center'>
                        <InputText
                            id='code'
                            type='text'
                            placeholder='ABC123'
                            className='w-8 mb-3 py-4 font-bold text-3xl text-center'
                        />
                    </div>
                    <div className='flex align-items-center justify-content-evenly mb-2 '>
                        <Button
                            label='Join poll'
                            icon='pi pi-search'
                            className='w-3'
                        />
                        <span className='text-2xl'> or </span>
                        <Button
                            onClick={() => {
                                navigate('/create')
                            }}
                            label='Create poll'
                            icon='pi pi-caret-up'
                            className='w-3 bg-danger'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
