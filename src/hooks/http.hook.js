import {useState, useCallback} from 'react'

export const useHttp = (token) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url, method = 'GET', body = null, headers={} ) => {
        setLoading(true)
        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
              }
            if(token){
                headers['Authorisation'] = `Bearer ${token}`
            }
            const res = await fetch(url, {method, body, headers})
            const data = await res.json()
            
            if(!res.ok){
                throw new Error(data.message || "Something went wrong")
            }
            
            setLoading(false)
            return data 
        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
       

    }, [])

    const clearError = useCallback(()=> setError(null), [])

    return {loading, clearError, request, error}
}
