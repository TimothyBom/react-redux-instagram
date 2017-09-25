import axios from 'axios'

export const ADD_VOTE = 'ADD_VOTE'
export const SET_DELETE_VOTE = 'SET_DELETE_VOTE'
export const SET_ALL_VOTE = 'SET_ALL_VOTE'
export const SET_VOTE_BY_POST = 'SET_VOTE_BY_POST'

export const addVote = vote => ({
    type: ADD_VOTE,
    vote
})

export const setDeleteVote = voteId => ({
    type: SET_DELETE_VOTE,
    voteId
})

export const setAllVote = votes => ({
    type: SET_ALL_VOTE,
    votes
})

export const setVoteByPost = votes => ({
    type: SET_VOTE_BY_POST,
    votes
})

export const addNewVote = (userId, postId) => dispatch => {
    return axios.post(`/api/votes/${userId}/vote/${postId}`).then(res => {
        dispatch(addVote(res.data.vote))
    })
}

export const getDeleteVote = (userId, postId) => dispatch => {
    return axios.get(`/api/votes/${userId}/delete/${postId}`).then(res => {
        dispatch(setDeleteVote(res.data.vote._id))
    })
}

export const getAllVote = () => dispatch => {
    return axios.get(`/api/votes`).then(res => {
        dispatch(setAllVote(res.data.votes))
    })
}

export const getVoteByPost = () => dispatch => {
    return axios.get(`/api/votes/post`).then(res => {
        dispatch(setVoteByPost(res.data.votes))
    })
}