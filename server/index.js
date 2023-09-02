import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import redisClient from './redisClient.js'
//middleware

import { getAddress } from './middleware/getAddress.js'

// routes
import user from './routes/auth.js'
import poll from './routes/poll.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const httpServer = createServer(app)
export const io = new Server(httpServer)

const PORT = process.env.PORT

app.use('/', user)
app.use('/poll', poll)

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
