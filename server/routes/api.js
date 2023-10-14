import express from 'express'
import { checkUser, user } from '../controllers/user.js'
const router = express.Router()

router.post('/api/address', user)
router.post('/api/checkUser', checkUser)

export default router
