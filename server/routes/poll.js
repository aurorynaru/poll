import express from 'express'
import { postPoll } from '../controllers/poll.js'
import { viewPoll } from '../controllers/poll.js'
const router = express.Router()

router.post('/create', postPoll)
router.post('/poll/:code', viewPoll)

export default router
