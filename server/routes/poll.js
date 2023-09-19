import express from 'express'
import { postPoll } from '../controllers/poll.js'
import { viewPoll } from '../controllers/poll.js'
const router = express.Router()

router.post('/create', postPoll)
router.get('/:code', viewPoll)
router.post('/vote', viewPoll)

export default router
