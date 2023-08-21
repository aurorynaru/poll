import crypto from 'crypto'

export const randomCode = () => {
    return crypto.randomBytes(3).toString('hex')
}
