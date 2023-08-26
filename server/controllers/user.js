import pool from '../mysqlPool.js'
import jwt from 'jsonwebtoken'

export const createUser = async (address) => {
    const salt = await bcrypt.genSalt()
    const hashAddress = await bcrypt.hash(address, salt)

    const [res] = await pool.query('INSERT INTO user (ip_address) VALUES (?)', [
        hashAddress
    ])

    return res.insertId
}

export const getUserAddress = async (address) => {
    const [res] = await pool.query('SELECT * FROM user WHERE ip_address = ? ', [
        address
    ])

    return res[0].id
}

export const getUserId = async (id) => {
    const [res] = await pool.query('SELECT * FROM user WHERE id = ? ', [id])

    const isMatch = await bcrypt.compare(address, res[0].ip_address)

    if (!isMatch) {
        throw new Error('error not match')
    }

    const token = jwt.sign({ id: res[0].id }, process.env.JWT_SECRET)

    return { token: token, id: res[0].id }
}

export const user = async (req, res) => {
    try {
        let address = req.clientIp

        if (!address || address === '::1') {
            address = '127.0.0.1'
        }

        const isMatch = await getUserAddress(address.toString())

        if (isMatch === undefined) {
            const userId = await createUser(address.toString())
            const userObj = await getUserId(userId)

            res.status(200).json(userObj)
        } else {
            const userObj = await getUserId(isMatch)
            res.status(200).json(userObj)
        }
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
