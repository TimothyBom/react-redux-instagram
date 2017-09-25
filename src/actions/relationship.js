import axios from 'axios'

export const SET_FOLLOW_USER = 'SET_FOLLOW_USER'
export const SET_ALL_FOLLOW_USER = 'SET_ALL_FOLLOW_USER'
export const SET_UNFOLLOW_USER = 'SET_UNFOLLOW_USER'

export const setFollowUser = follow => ({
    type: SET_FOLLOW_USER,
    follow
})

export const setAllFollowUser = follows => ({
    type: SET_ALL_FOLLOW_USER,
    follows
})

export const setUnFollowUser = follow => ({
    type: SET_UNFOLLOW_USER,
    follow
})

export const getFollowUser = (currentUser, userId) => dispatch => {
    return axios.post(`/api/users/${currentUser}/follow/${userId}`).then(res => {
        dispatch(setFollowUser(res.data.follow[0]))
    })
}

export const getAllFollowUser = username => dispatch => {
    return axios.get(`/api/users/${username}/follow`).then(res => {
        dispatch(setAllFollowUser(res.data.follows))
    })
}

export const getUnFollowUser = (currentUser, userId) => dispatch => {
    return axios.get(`/api/users/${currentUser}/unfollow/${userId}`).then(res => {
        dispatch(setUnFollowUser(res.data.follow[0]))
    })
}

export const setFollowerUser = (currentUser, userId) => dispatch => {
    return axios.post(`/api/users/${userId}/follower/${currentUser}`)
}

export const getunFollowerUser = (currentUser, userId) => dispatch => {
    return axios.get(`/api/users/${userId}/unfollower/${currentUser}`)
}