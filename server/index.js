import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import redisClient from './redisClient.js'

//middleware

// routes

const corsOptions = {
    origin: 'https://poll-rvo7.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}
import getAddress from './routes/api.js'
import poll from './routes/poll.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const httpServer = createServer(app)
export const io = new Server(httpServer, { cors: { origin: '*' } })

io.on('connection', (socket) => {
    console.log('Client connected')

    const redisChannel = 'pollUpdates'
    redisClient.subscribe(redisChannel)

    redisClient.on('message', (channel, message) => {
        if (channel === redisChannel) {
            socket.emit('pollUpdate', JSON.parse(message))
        }
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
        redisClient.unsubscribe(redisChannel)
    })
})

const PORT = process.env.PORT || 7777

app.use('/', getAddress)
app.use('/poll', poll)

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
