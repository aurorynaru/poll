import express from 'express'
import { user } from '../controllers/user.js'
const router = express.Router()

router.post('/api/address', user)

export default router
