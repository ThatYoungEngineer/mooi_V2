import client from './client';

const loginRoute = '/auth'
const registerRoute = '/users'

const login = (email, password) => {
    return client.post(loginRoute, {email, password})
}

const register = (name, email, password) => {
    return client.post(registerRoute, {name, email, password})
}

export default {
    login,
    register
}