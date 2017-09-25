import axios from 'axios'

export const getUserSignup = data => dispatch => {
    return axios.post('/api/users', data)
}

export const checkUserExist = identifier => dispatch => {
    return axios.get(`/api/users/check/${identifier}`)
}