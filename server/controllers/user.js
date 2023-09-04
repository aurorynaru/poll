import pool from '../mysqlPool.js'
import jwt from 'jsonwebtoken'
import requestIp from 'request-ip'
import bcrypt from 'bcrypt'

export const createUser = async (address) => {
    const salt = await bcrypt.genSalt()
    const hashAddress = await bcrypt.hash(address, salt)

    const [res] = await pool.query(
        'INSERT INTO user (ip_address, hash_address) VALUES (?,?)',
        [address, hashAddress]
    )

    return res.insertId
}

export const getUserAddress = async (address) => {
    const [res] = await pool.query('SELECT * FROM user WHERE ip_address = ? ', [
        address
    ])

    if (res[0] != undefined) {
        return res[0].id
    } else {
        return undefined
    }
}

export const getUserId = async (id, address) => {
    const [res] = await pool.query('SELECT * FROM user WHERE id = ? ', [id])

    const isMatch = await bcrypt.compare(address, res[0].hash_address)

    if (!isMatch) {
        throw new Error('error not match')
    }

    const token = jwt.sign({ id: res[0].id }, process.env.JWT_SECRET)

    return { token: token, hash: res[0].hash_address }
}

export const user = async (req, res) => {
    try {
        let address = requestIp.getClientIp(req)

        if (!address || address === '::1') {
            address = '127.0.0.1'
        }

        const isMatch = await getUserAddress(address.toString())
        console.log(isMatch)
        if (isMatch === undefined) {
            const userId = await createUser(address.toString())
            const userObj = await getUserId(userId, address.toString())

            res.status(200).json(userObj)
        } else {
            const userObj = await getUserId(isMatch, address.toString())
            res.status(200).json(userObj)
        }
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
