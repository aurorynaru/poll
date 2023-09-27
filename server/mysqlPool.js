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

export const checkVoted = async (userId, pollId) => {
    try {
        const isVoted = await pool.query(
            `SELECT * FROM poll_option_user_pivot WHERE user_id = ?  AND poll_id = ?`,
            [userId, pollId]
        )

        return isVoted
    } catch (error) {
        throw new Error(error.message)
    }
}

export const addVote = async (optionsId, data) => {
    try {
        await pool.query(`UPDATE options SET option_votes = ? WHERE id = ?`, [
            data,
            optionsId
        ])

        return
    } catch (error) {
        throw new Error(error.message)
    }
}

export const minusVote = async (optionsId, data) => {
    try {
        await pool.query(`UPDATE options SET option_votes = ? WHERE id = ?`, [
            data,
            optionsId
        ])

        return
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updatePivot = async (newOptionsId, pivotId) => {
    try {
        await pool.query(
            `UPDATE poll_option_user_pivot SET options_id = ? WHERE id = ?`,
            [newOptionsId, pivotId]
        )

        return
    } catch (error) {
        throw new Error(error.message)
    }
}

export const saveVote = async (userId, optionsId, pollId) => {
    try {
        const [optionsData] = await pool.query(
            `SELECT * FROM options WHERE id = ?`,
            [optionsId]
        )

        const [option] = [optionsData][0]
        const addData = option.option_votes + 1
        const [isVoted] = await checkVoted(userId, pollId)

        if (isVoted.length < 1) {
            await pool.query(
                'INSERT INTO poll_option_user_pivot (user_id,options_id,poll_id) VALUES (?,?,?)',
                [userId, optionsId, pollId]
            )

            await addVote(optionsId, addData)

            return
        }

        const [getOldVote] = await pool.query(
            `SELECT * FROM poll_option_user_pivot WHERE user_id = ?  AND poll_id = ?`,
            [userId, pollId]
        )
        const pivotId = getOldVote[0].id
        const oldVoteId = getOldVote[0].options_id
        if (oldVoteId === optionsId) {
            return
        }

        await updatePivot(optionsId, pivotId)
        const [optionsDataMinus] = await pool.query(
            `SELECT * FROM options WHERE id = ?`,
            [oldVoteId]
        )
        const [optionMinus] = [optionsDataMinus][0]
        let minusData
        if (optionMinus.option_votes > 0) {
            minusData = optionMinus.option_votes - 1
        }
        minusData = 0

        await minusVote(oldVoteId, minusData)

        await addVote(optionsId, addData)

        return
    } catch (error) {}
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
