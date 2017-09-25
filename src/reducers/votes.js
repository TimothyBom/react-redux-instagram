import { ADD_VOTE, SET_ALL_VOTE, SET_VOTE_BY_POST, SET_DELETE_VOTE } from '../actions/vote'

const initialState = {
    votes: []
}

export default (state=initialState, action) => {
    switch (action.type) {
        case SET_ALL_VOTE:
            return action.votes
        case ADD_VOTE:
            return [
                ...state,
                action.vote
            ]
        case SET_VOTE_BY_POST:
            return action.votes
        case SET_DELETE_VOTE:
            return state.filter(vote => vote._id !== action.voteId)
        default:
            return state
    }
}