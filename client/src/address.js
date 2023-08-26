import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
export const ipAddress = `http://localhost:${PORT}`
