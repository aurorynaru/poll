import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPurge, setToken, setId } from '../features/user/userSlice'
import { checkUser, getAddress } from '../middleware/midware'
const Home = () => {
    const id = useSelector((state) => state.id)
    const token = useSelector((state) => state.token)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [isActive, setIsActive] = useState(false)

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

        const checkUserId = async () => {
            const checkUserRes = await checkUser(id)
            if (checkUserRes.message === 'not active') {
                dispatch(setPurge())
                getAddressFn()
            } else {
                return
            }
        }

        if (isMounted && token && id) {
            checkUserId()
        }

        if (isMounted && !token && !id) {
            getAddressFn()
        }

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        if (id && !isActive) {
            if (token) {
                setIsActive(true)
            }
        }
    }, [id, token])

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
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            id='code'
                            type='text'
                            placeholder='ABC123'
                            className='w-8 mb-3 py-4 font-bold text-3xl text-center'
                        />
                    </div>
                    <div className='flex align-items-center justify-content-evenly mb-2 '>
                        <Button
                            disabled={isActive ? false : true}
                            onClick={() => {
                                if (code && code.length == 6) {
                                    navigate(`/poll/${code}`)
                                } else {
                                    console.log('invalid code')
                                }
                            }}
                            label='Join poll '
                            icon='pi pi-search'
                            className='w-3 button-text w-fit'
                        />
                        <span className='text-2xl'> or </span>
                        <Button
                            disabled={isActive ? false : true}
                            onClick={() => {
                                navigate('/create')
                            }}
                            label='Create poll'
                            icon='pi pi-caret-up'
                            className='w-3 bg-danger button-text w-fit'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
