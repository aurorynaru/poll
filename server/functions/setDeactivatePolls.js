import { checkPollExpired } from '../mysqlPool.js'

export const deactivatePollFn = async () => {
    try {
        const res = await checkPollExpired()

        console.log('Total polls deactivated:', res.deactivatedCount)

        return 1
    } catch (error) {
        throw error
    }
}
