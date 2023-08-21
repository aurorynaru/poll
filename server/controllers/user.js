import pool from '../mysqlPool.js'

export const createUser = async (address) => {
    const [res] = await pool.query('INSERT INTO user (ip_address) VALUES (?)', [
        address
    ])

    return res.insertId
}

export const getUserAddress = async (address) => {
    const [res] = await pool.query('SELECT * FROM user WHERE ip_address = ? ', [
        address
    ])
    return res[0]
}

export const getUserId = async (id) => {
    const [res] = await pool.query('SELECT * FROM user WHERE id = ? ', [id])
    return res[0]
}

export const user = async (req, res) => {
    try {
        let address = req.clientIp

        if (!address || address === '::1') {
            address = '127.0.0.1'
        }

        const isMatch = await getUserAddress(address.toString())

        if (isMatch === undefined) {
            const userId = await createUser(address)
            const userObj = await getUserId(userId)

            res.status(200).json(userObj)
        } else {
            const userObj = await getUserAddress(address)
            res.status(200).json(userObj)
        }
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
