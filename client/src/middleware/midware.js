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
