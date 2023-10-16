import express from 'express'
import { postPoll, votePoll } from '../controllers/poll.js'
import { viewPoll } from '../controllers/poll.js'
const router = express.Router()

router.post('/create', postPoll)
router.post('/vote', votePoll)
router.post('/:code', viewPoll)

export default router
