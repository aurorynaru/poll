import mysql from 'mysql2'
import dotenv from 'dotenv'
import { randomCode } from './functions/random.js'
dotenv.config()
//poll_option_user_pivot
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

export const createPoll = async (
    title,
    user_id,
    expiration,
    options,
    single_vote
) => {
    const code = randomCode()
    const [res] = await pool.query(
        'INSERT INTO poll (title,user_id,expiration,code,single_vote) VALUES (?,?,?,?,?)',
        [title, user_id, expiration, code, single_vote]
    )

    const pollId = res.insertId
    createOptions(options, pollId)

    return res.insertId
}

export const createOptions = async (options, pollId) => {
    const dataIdArray = options.map(async (option) => {
        const { answer } = option

        const [res] = await pool.query(
            'INSERT INTO options (poll_option,options_id) VALUES (?,?)',
            [answer, pollId]
        )

        return res.insertId
    })

    return dataIdArray
}

export const getOptions = async (id) => {
    const [res] = await pool.query(
        `SELECT * FROM options WHERE options_id = ?`,
        [id]
    )

    return res
}

export const saveVote = async (id) => {
    const [optionsData] = await pool.query(
        `SELECT * FROM options WHERE id = ?`,
        [id]
    )

    const option = [optionsData][0]

    const newData = option.option_votes++

    const [res] = await pool.query(
        `UPDATE options SET salary = ? WHERE id = ?`,
        [newData, id]
    )
    return res.insertId
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
