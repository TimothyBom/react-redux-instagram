import { ADD_POST, SET_POST_USER, SET_POST_BY_FOLLOW, SET_DELETE_POST } from '../actions/post'

const initialState = {
    posts: []
}

export default (state=initialState, action) => {
    switch (action.type) {
        case SET_POST_USER:
            return action.posts
        case ADD_POST:
            return [
                ...state,
                action.post
            ]
        case SET_POST_BY_FOLLOW:
            return action.posts
        case SET_DELETE_POST:
            return state.filter(post => post._id !== action.postId)
        default:
            return state
    }
}