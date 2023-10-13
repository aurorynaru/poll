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
        console.log(title, user_id, expiration, options, single_vote)
        const id = await createPoll(
            title,
            user_id,
            expiration,
            options,
            single_vote
        )
        console.log('id', id)
        const pollObj = await viewPollId(id)
        await getOptions(id)
        console.log('pollObj', pollObj)
        res.status(201).json({
            code: pollObj.code,
            poll_id: pollObj.id,
            user_id: pollObj.user_id
        })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
//test save res
export const votePoll = async (req, res) => {
    try {
        const { userId, optionsId, pollId, code } = req.body

        const isExpired = await checkPollExpiredId(pollId)

        const poll = await viewPollCode(code)
        await saveVote(userId, optionsId, pollId)
        const [isVote] = await checkVoted(poll.user_id, poll.id)
        let selectedAnsId = 0

        if (isVote.length > 0) {
            selectedAnsId = isVote[0].options_id
        }
        if (!poll) {
            throw new Error('No poll found')
        }
        const options = await getOptions(poll.id)

        io.emit('pollUpdate', { poll, options, selectedAnsId, isExpired })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
//edit
export const viewPoll = async (req, res) => {
    try {
        const { code } = req.params

        const poll = await viewPollCode(code)
        const isExpired = await checkPollExpiredId(poll.id)
        const options = await getOptions(poll.id)
        const [isVote] = await checkVoted(poll.user_id, poll.id)

        let selectedAnsId = 0

        if (isVote.length > 0) {
            selectedAnsId = isVote[0].options_id
        }
        if (!poll) {
            throw new Error('No poll found')
        }

        res.status(200).json({ poll, options, selectedAnsId, isExpired })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
