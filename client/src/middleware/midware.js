import { useDispatch } from 'react-redux'
import { ipAddress } from '../address'

export const getAddress = async () => {
    try {
        const res = await fetch(`${ipAddress}/api/address`, {
            method: 'POST'
        })
        const resAddress = await res.json()

        return resAddress
    } catch (error) {
        console.log(error)
    }
}

export const checkUser = async (userId) => {
    const dispatch = useDispatch()
    try {
        const res = await fetch(`${ipAddress}/api/checkUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        const resAddress = await res.json()
        if (!resAddress.message) {
            console.log('deleted')
            dispatch(setPurge())
        } else {
            return
        }
    } catch (error) {}
}
