import {useState, useCallback, useEffect} from 'react'
const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState(null)

  const login = useCallback((jwtToken, id, username) => {
    setToken(jwtToken)
    setUserId(id)
    setUsername(username)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, username
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUsername(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const storedValue = localStorage.getItem(storageName)
    let data
    if(storedValue){
        data = JSON.parse(storedValue)
    }

    if (data && data.token) {
        login(data.token, data.userId)
    }
    setReady(true)
  }, [login])


  return { login, logout, token, userId, username, ready }
}