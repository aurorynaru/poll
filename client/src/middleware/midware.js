import { ipAddress } from '../address'

export const getAddress = async () => {
    try {
        const res = await fetch(`${ipAddress}/api/address`, {
            method: 'POST'
        })
        const resAddress = await res.json()
        console.log(resAddress)
        return resAddress
    } catch (error) {
        console.log(error)
    }
}

export const checkUser = async (userId) => {
    try {
        const res = await fetch(`${ipAddress}/api/checkUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        const resAddress = await res.json()
        console.log(resAddress)
        if (!resAddress.message) {
            return { message: 'not active' }
        } else {
            return { message: 'active' }
        }
    } catch (error) {}
}
