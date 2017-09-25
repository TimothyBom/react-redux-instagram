import axios from 'axios'

export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_COMMENT_BY_POST = 'SET_COMMENT_BY_POST'
export const SET_DELETE_COMMENT = 'SET_DELETE_COMMENT'

export const addComment = comment => ({
    type: ADD_COMMENT,
    comment
})

export const setCommentByPost = comments => ({
    type: SET_COMMENT_BY_POST,
    comments
})

export const setDeleteComment = commentId => ({
    type: SET_DELETE_COMMENT,
    commentId
})

export const addNewComment = data => dispatch => {
    return axios.post('/api/comments', data).then(res => {
        dispatch(addComment(res.data.comment))
    })
}

export const getCommentByPost = () => dispatch => {
    return axios.get('/api/comments').then(res => {
        dispatch(setCommentByPost(res.data.comments))
    })
}

export const getDeleteComment = (userId, commentId) => dispatch => {
    return axios.get(`/api/comments/${commentId}/delete/${userId}`).then(res => {
        dispatch(setDeleteComment(res.data.comment._id))
    })
}