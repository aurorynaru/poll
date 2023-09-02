export const randomCode = () => {
    let num = ''
    for (let i = 4; i > 0; i--) {
        const number = Math.floor(Math.random() * 4)
        num = num + number.toString()
    }
    return num
}
