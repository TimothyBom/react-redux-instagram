import axios from 'axios'
import jwt from 'jsonwebtoken'
import { setAuthorization } from '../utils/setAuthorization'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    user
})

export const getUserLogin = data => dispatch => {
    return axios.post('/api/auth', data).then(res => {
        const token = res.data.token
        localStorage.setItem('jwtToken', token)
        setAuthorization(token)
        dispatch(setCurrentUser(jwt.decode(token)))
    })
}

export const getUserLogout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthorization(false)
    dispatch(setCurrentUser({}))
}

export const getUpdateToken = userId => dispatch => {
    return axios.post(`/api/auth/${userId}`).then(res => {
        const token = res.data.token
        localStorage.setItem('jwtToken', token)
        setAuthorization(token)
        dispatch(setCurrentUser(jwt.decode(token)))
    })
}