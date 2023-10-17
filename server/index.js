import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import redisClient from './redisClient.js'

//middleware

// routes
export const activePolls = new Map()

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}
import getAddress from './routes/api.js'
import poll from './routes/poll.js'

dotenv.config()
const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())

const httpServer = createServer(app)
export const io = new Server(httpServer, { cors: { origin: '*' } })

io.on('connection', (socket) => {
    const pollUpdatesChannel = 'pollUpdates'

    redisClient.subscribe(pollUpdatesChannel)

    redisClient.on('message', (channel, message) => {
        if (channel === pollUpdatesChannel) {
            socket.emit('pollUpdate', JSON.parse(message))
        }
    })

    socket.on('disconnect', () => {
        redisClient.unsubscribe(pollUpdatesChannel)
    })
})

const PORT = process.env.PORT

app.use('/', getAddress)
app.use('/poll', poll)

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
