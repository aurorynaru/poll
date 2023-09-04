import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import redisClient from './redisClient.js'

//middleware

// routes
import getAddress from './routes/api.js'
import poll from './routes/poll.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const httpServer = createServer(app)
export const io = new Server(httpServer)

const PORT = process.env.PORT

// app.post('/api/address', async (req, res) => {
//     try {
//         const ip = requestIp.getClientIp(req)
//         if (!ip) {
//             throw new Error('something went wrong')
//         }
//         req.clientIp = ip

//         res.status(201).json(ip)
//     } catch (error) {
//         res.status(409).json({ error: error.message })
//     }
// })

app.use('/', getAddress)
app.use('/poll', poll)

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
