import axios from 'axios'

export const ADD_POST = 'ADD_POST'
export const SET_POST_USER = 'SET_POST_USER'
export const SET_POST_BY_FOLLOW = 'SET_POST_BY_FOLLOW'
export const SET_DELETE_POST = 'SET_DELETE_POST'

export const addPost = post => ({
    type: ADD_POST,
    post
})

export const setPostUser = posts => ({
    type: SET_POST_USER,
    posts
})

export const setPostByFollow = posts => ({
    type: SET_POST_BY_FOLLOW,
    posts
})

export const setDeletePost = postId => ({
    type: SET_DELETE_POST,
    postId
})

export const addNewPost = data => dispatch => {
    return axios.post('/api/posts', data).then(res => {
        dispatch(addPost(res.data.post))
    })
}

export const getPostUser = username => dispatch => {
    return axios.get(`/api/posts/${username}`).then(res => {
        dispatch(setPostUser(res.data.posts))
    })
}

export const getPostByFollow = currentUser => dispatch => {
    return axios.get(`/api/posts/follow/${currentUser}`).then(res => {
        dispatch(setPostByFollow(res.data.posts))
    })
}

export const getDeletePost = (userId, postId) => dispatch => {
    return axios.get(`/api/posts/${postId}/delete/${userId}`).then(res => {
        dispatch(setDeletePost(res.data.post._id))
    })
}

export const getDeleteImage = publicId => dispatch => {
    return axios.get(`/api/posts/image/delete/${publicId}`)
}