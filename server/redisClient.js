import redis from 'redis'

// Create and configure the Redis client instance
const redisClient = redis.createClient()

export default redisClient
