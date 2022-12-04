import { useEffect, useState } from 'react'

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null || jsonValue === 'undefined') {
            if (typeof initialValue === 'function') {
                return initialValue()
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorage