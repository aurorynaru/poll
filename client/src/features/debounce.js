export const debounce = (fn, t) => {
    let id

    return function (...args) {
        clearTimeout(id)
        id = setTimeout(() => fn(...args), t)
    }
}
