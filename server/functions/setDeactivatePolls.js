import { checkPollExpired } from '../mysqlPool.js'

export const deactivatePollFn = async () => {
    const res = await checkPollExpired()

    console.log('Total polls deactivated:', res.deactivatedCount)

    return 1
}
