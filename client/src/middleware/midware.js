export const getAddress = async () => {
    const res = await fetch('http://localhost:7777/api/address', {
        method: 'POST'
    })
    const resAddress = await res.json()

    return resAddress
}
