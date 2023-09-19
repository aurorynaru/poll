import redisClient from '../redisClient.js'
import pool, {
    saveVote,
    createPoll,
    viewPollCode,
    viewPollId,
    getOptions
} from '../mysqlPool.js'

export const postPoll = async (req, res) => {
    try {
        const { title, user_id, expiration, options, single_vote } = req.body

        const id = await createPoll(
            title,
            user_id,
            expiration,
            options,
            single_vote
        )

        const pollObj = await viewPollId(id)
        const optionsData = await getOptions(id)

        res.status(201).json({
            code: pollObj.code,
            poll_id: pollObj.id,
            user_id: pollObj.user_id
        })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const votePoll = async (req, res) => {
    try {
        const { userId, optionsId, pollId, code } = req.body
        await saveVote(userId, optionsId, pollId)
        const poll = await viewPollCode(code)
        const options = await getOptions(poll.id)

        res.status(200).json({ poll, options })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const viewPoll = async (req, res) => {
    try {
        const { code } = req.params

        const poll = await viewPollCode(code)
        const options = await getOptions(poll.id)
        if (!poll) {
            throw new Error('No poll found')
        }

        res.status(200).json({ poll, options })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
