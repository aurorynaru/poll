import { randomCode } from './random'

export const getRandomName = async () => {
    let name = ''
    let count = 0

    for (let i = 1; i < 3; i++) {
        count++
        const word = await fetch('https://random-word-api.herokuapp.com/word')

        const res = await word.json()

        const nameUpperCase =
            res[0].split('')[0].toUpperCase() + res[0].slice(1)

        name += nameUpperCase
    }

    if (count === 2) {
        const resRand = randomCode()
        name += resRand

        return name
    }
}
