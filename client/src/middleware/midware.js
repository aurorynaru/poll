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
    try {
        const data = {
            userId: userId
        }
        const res = await fetch(`${ipAddress}/api/checkUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const resAddress = await res.json()

        if (!resAddress.message) {
            return { message: 'not active' }
        } else {
            return { message: 'active' }
        }
    } catch (error) {
        console.log(error)
    }
}
