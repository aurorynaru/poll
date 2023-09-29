import crypto from 'crypto'

export const randomCode = async () => {
    return crypto.randomBytes(3).toString('hex')
}
