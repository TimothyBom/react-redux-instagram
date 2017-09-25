import axios from 'axios'

export const SET_SEARCH_USER = 'SET_SEARCH_USER'

export const setSearchUser = user => {
    return {
        type: SET_SEARCH_USER,
        user
    }
}

export const getSearchUser = username => dispatch => {
    return axios.get(`/api/search/${username}`).then(res => {
        dispatch(setSearchUser(res.data.user))
    })
}