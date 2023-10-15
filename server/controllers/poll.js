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
//test save res
export const votePoll = async (req, res) => {
    try {
        const { userId, optionsId, pollId, code } = req.body
        console.log('voter', userId)
        const isExpired = await checkPollExpiredId(pollId)
        console.log('checked if expired')
        const poll = await viewPollCode(code)
        console.log('poll 1st')
        await saveVote(userId, optionsId, pollId)
        console.log('vote saved')
        const [isVote] = await checkVoted(userId, poll.id)
        console.log('got if voted')
        let selectedAnsId = 0

        if (isVote.length > 0) {
            selectedAnsId = isVote[0].options_id
        }
        if (!poll) {
            throw new Error('No poll found')
        }
        const options = await getOptions(poll.id)
        console.log('got iptiis')
        console.log('user:', userId, 'poll:', poll.id)
        io.emit('pollUpdate', { poll, options, selectedAnsId, isExpired })
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
        console.log(isVote)
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
