import mysql from 'mysql2'
import dotenv from 'dotenv'
import { randomCode } from './functions/random.js'
dotenv.config()
const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
    .promise()

export const saveVote = async (address) => {
    const [res] = await pool.query('INSERT INTO user (ip_address) VALUES (?)', [
        address
    ])
    return res.insertId
}

export const createPoll = async (title, user_id, expiration, options) => {
    try {
        const code = randomCode()
        const [res] = await pool.query(
            'INSERT INTO poll (title,user_id,expiration,code) VALUES (?,?,?,?)',
            [title, user_id, expiration, code]
        )
        const pollId = res.insertId
        createOptions(options, pollId)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const createOptions = async (options, pollId) => {
    const dataIdArray = options.map(async (option) => {
        const { poll_option, option_vote } = option

        const [res] = await pool.query(
            'INSERT INTO poll (poll_option,option_votes,options_id) VALUES (?,?,?)',
            [poll_option, option_vote, pollId]
        )

        return res.insertId
    })

    return dataIdArray
}
export const viewPollCode = async (code) => {
    const [res] = await pool.query(`SELECT * FROM poll WHERE code = ?`, [code])

    return res[0]
}

export const viewPollId = async (id) => {
    const [res] = await pool.query(`SELECT * FROM poll WHERE id = ?`, [id])

    return res[0]
}

export default pool
