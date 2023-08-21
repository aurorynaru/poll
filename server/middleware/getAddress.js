import requestIp from 'request-ip'

export const getAddress = async (req, res, next) => {
    try {
        const ip = requestIp.getClientIp(req)
        if (!ip) {
            throw new Error('something went wrong')
        }
        req.clientIp = ip
        next()
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
