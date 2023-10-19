// export const ipAddress = `https://poll-backend-c83d.onrender.com`

const apiUrlHost = import.meta.env.VITE_IP_HOST
const apiUrlLocal = import.meta.env.VITE_IP_LOCAL
const apiPort = import.meta.env.VITE_PORT
export const ipAddress = apiUrlLocal + apiPort
