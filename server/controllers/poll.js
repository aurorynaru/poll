import redisClient from '../redisClient.js'
import pool from '../mysqlPool.js'
import { createOptions } from '../mysqlPool.js'
import { createPoll } from '../mysqlPool.js'
import { viewPollCode } from '../mysqlPool.js'
import { viewPollId } from '../mysqlPool.js'

export const postPoll = async (req, res) => {
    try {
        const { title, user_id, expiration, options } = req.body
        const id = await createPoll(title, user_id, expiration, options)
        const pollObj = await viewPollId(id)
        res.status(201).json({ pollObj })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// export const postOptions = async (req, res) => {
//     try {
//         const { options, pollId } = req.body
//         createOptions(options, pollId)
//     } catch (error) {
//         res.status(409).json({ error: error.message })
//     }
// }

export const viewPoll = async (req, res) => {
    try {
        const { code } = req.params
        const poll = viewPollCode(code)
        if (!poll) {
            throw new Error('No poll found')
        }

        res.status(200).json(poll)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const saveVote = async (req, res) => {}
