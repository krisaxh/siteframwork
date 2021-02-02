export const getLogin = () => {
    return sessionStorage.getItem('LOGIN_INFO').toString() || null
}

export const getToken = () => {
    return sessionStorage.getItem('AUTH_TOKEN').toString() || null
}

export const setSession = (token, login) => {
    sessionStorage.setItem('AUTH_TOKEN', token)
    sessionStorage.setItem('LOGIN_INFO', login)
}

export const removeSession = () => {
    sessionStorage.removeItem('AUTH_TOKEN')
    sessionStorage.removeItem('LOGIN_INFO')
}