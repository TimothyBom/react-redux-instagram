import axios from 'axios'

export const SET_USER_PAGE = 'SET_USER_PAGE'
export const SET_USER_INFO = 'SET_USER_INFO'

export const setUserPage = user => {
    return {
        type: SET_USER_PAGE,
        user
    }
}

export const setUserInfo = user => {
    return {
        type: SET_USER_INFO,
        user
    }
}

export const getUserPage = username => dispatch => {
    return axios.get(`/api/users/${username}`).then(res => {
        dispatch(setUserPage(res.data.user))
    })
}

export const getUserInfo = username => dispatch => {
    return axios.get(`/api/users/${username}`).then(res => {
        dispatch(setUserInfo(res.data.user))
    })
}

export const setEditUser = (username, data) => dispatch => {
    return axios.put(`/api/users/${username}`, data)
}

export const checkPassword = (userId, token) => dispatch => {
    return axios.get(`/api/users/${userId}/check?token=${token}`)
}

export const updateUserPassword = (userId, data) => dispatch => {
    return axios.put(`/api/users/${userId}/password`, data)
}