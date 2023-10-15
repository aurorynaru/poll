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
        connectionLimit: 20,
        queueLimit: 0
    })
    .promise()

pool.on('connection', (connection) => {
    console.log('Connected to MySQL database')
})

export const deactivatePollFn = async (expDate, id) => {
    try {
        const isExpired = await checkIfExpired(expDate, id)

        if (isExpired === 1) {
            return 1
        } else {
            return 0
        }
    } catch (error) {
        throw error
    }
}

export const createPoll = async (
    title,
    user_id,
    expiration,
    options,
    single_vote
) => {
    try {
        const code = await randomCode()
        const [res] = await pool.query(
            'INSERT INTO poll (title,user_id,expiration,code,single_vote) VALUES (?,?,?,?,?)',
            [title, user_id, expiration, code, single_vote]
        )

        const pollId = res.insertId
        await createOptions(options, pollId)

        return res.insertId
    } catch (error) {
        throw error
    }
}

export const createOptions = async (options, pollId) => {
    try {
        const dataIdArray = options.map(async (option) => {
            const { answer } = option

            const [res] = await pool.query(
                'INSERT INTO options (poll_option,options_id) VALUES (?,?)',
                [answer, pollId]
            )

            return res.insertId
        })

        return dataIdArray
    } catch (error) {
        throw error
    }
}

export const getOptions = async (id) => {
    try {
        const [res] = await pool.query(
            `SELECT * FROM options WHERE options_id = ?`,
            [id]
        )

        return res
    } catch (error) {
        throw error
    }
}

export const checkVoted = async (userId, pollId) => {
    try {
        const isVoted = await pool.query(
            `SELECT * FROM poll_option_user_pivot WHERE user_id = ?  AND poll_id = ?`,
            [userId, pollId]
        )

        return isVoted
    } catch (error) {
        throw error
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
        throw error
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
        throw error
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
        throw error
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
        let minusData = optionMinus.option_votes - 1
        if (optionMinus.option_votes === 0) {
            minusData = 0
        }

        try {
        } catch (error) {
            throw error
        }

        await minusVote(oldVoteId, minusData)
        await addVote(optionsId, addData)

        return
    } catch (error) {
        throw error
    }
}

export const viewPollCode = async (code) => {
    try {
        const [res] = await pool.query(`SELECT * FROM poll WHERE code = ?`, [
            code
        ])
        return res[0]
    } catch (error) {
        throw error
    }
}

export const viewPollId = async (id) => {
    try {
        const [res] = await pool.query(`SELECT * FROM poll WHERE id = ?`, [id])
        return res[0]
    } catch (error) {
        throw error
    }
}

export const checkIfExpired = async (expDate, id) => {
    try {
        const isExpired = await pool.query(
            `SELECT expired from poll where id = ?`,
            [id]
        )
        if (isExpired === 1) {
            return 1
        }
        const expirationDate = new Date(expDate)
        const currentDate = new Date()

        const expirationTimestamp = expirationDate.getTime()
        const currentTimestamp = currentDate.getTime()

        if (currentTimestamp > expirationTimestamp) {
            await pool.query(` UPDATE poll SET expired = ? WHERE id = ? `, [
                1,
                id
            ])
            return 1
        } else {
            return 0
        }
    } catch (error) {
        throw error
    }
}

export const checkPollExpiredId = async (id) => {
    try {
        console.log('yo')
        const [res] = await pool.query(`SELECT * FROM poll WHERE id =?`, [id])
        console.log('res', res)
        const isExpired = await checkIfExpired(res[0].expiration, id)
        console.log('expired', isExpired)
        if (isExpired === 1) {
            return 1
        } else {
            return 0
        }
    } catch (error) {
        throw error
    }
}

export const checkPollExpired = async () => {
    try {
        const [res] = await pool.query(`SELECT * FROM poll`)

        for (const data of res) {
            await checkIfExpired(data.expiration, data.id)
            console.log(`${data.id} is expired `)
        }
    } catch (error) {
        throw error
    }
}

export default pool
