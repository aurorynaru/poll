import { ipAddress } from '../address'
export const getAddress = async () => {
    const res = await fetch(`${ipAddress}/api/address`, {
        method: 'POST'
    })
    const resAddress = await res.json()

    return resAddress
}
