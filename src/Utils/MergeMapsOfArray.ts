type TMapOfArray<T> = Record<string, Array<T>>

const mergeMapsOfArray = <T>(map1: TMapOfArray<T>, map2: TMapOfArray<T>) => {
    return Object.entries(map1).reduce<TMapOfArray<T>>((acc, [key, value]) => {
        if (acc[key]) {
            acc[key].push(...value)
            return acc
        }

        acc[key] = value

        return acc
    }, map2)
}

export {mergeMapsOfArray}
