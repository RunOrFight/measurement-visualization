const withDelay = <T>(smth: T, delay: number) => new Promise<T>((res) => {
    setTimeout(() => {
        res(smth)
    }, delay)
})

export {withDelay}
