import redisClient from '../redisClient.js'
import pool, {
    saveVote,
    createPoll,
    viewPollCode,
    viewPollId,
    getOptions,
    checkVoted,
    checkPollExpiredId
} from '../mysqlPool.js'
import { io } from '../index.js'

export const postPoll = async (req, res) => {
    try {
        const { title, user_id, expiration, options, single_vote } = req.body
        console.log('user', user_id)
        const id = await createPoll(
            title,
            user_id,
            expiration,
            options,
            single_vote
        )

        const pollObj = await viewPollId(id)
        await getOptions(id)

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
        const isExpired = await checkPollExpiredId(pollId)
        if (isExpired === 1) {
            return
        }
        const poll = await viewPollCode(code)
        await saveVote(userId, optionsId, pollId)

        if (!poll) {
            throw new Error('No poll found')
        }
        const options = await getOptions(poll.id)
        console.log(`userId:${userId} voted`)
        io.emit('pollUpdate', { poll, options, isExpired })

        res.status(200).json({ message: 'vote saved' })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
//edit
export const viewPoll = async (req, res) => {
    try {
        const { code } = req.params
        const { userId } = req.body

        const poll = await viewPollCode(code)
        const isExpired = await checkPollExpiredId(poll.id)
        const options = await getOptions(poll.id)
        const [isVote] = await checkVoted(userId, poll.id)

        let selectedAnsId = 0

        if (isVote.length > 0) {
            selectedAnsId = isVote[0].options_id
        }
        if (!poll) {
            throw new Error('No poll found')
        }
        console.log(selectedAnsId)
        res.status(200).json({ poll, options, selectedAnsId, isExpired })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
