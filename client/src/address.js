// export const ipAddress = `https://poll-backend-c83d.onrender.com`

const apiUrl = import.meta.env.VITE_IP_HOST
const apiPort = import.meta.env.VITE_PORT
export const ipAddress = apiUrl + apiPort
