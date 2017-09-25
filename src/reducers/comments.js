import { ADD_COMMENT, SET_COMMENT_BY_POST, SET_DELETE_COMMENT } from '../actions/comment'

const initialState = {
    comments: []
}

export default (state=initialState, action) => {
    switch (action.type) {
        case SET_COMMENT_BY_POST:
            return action.comments
        case ADD_COMMENT:
            return [
                ...state,
                action.comment
            ]
        case SET_DELETE_COMMENT:
            return state.filter(comment => comment._id !== action.commentId)
        default:
            return state
    }
}