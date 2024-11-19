import {useState} from 'react'

const useApi = (apiFunc) => {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const request = async () => {
        setLoading(true)
        setError('')

        const response = await apiFunc()
        
        if(response.ok) {
            setData(response.data)
            setLoading(false)
        } else {
            setError('Failed to fetch data')
            setLoading(false)
        }
    }

    return { data, error, loading, request }
}

export default useApi