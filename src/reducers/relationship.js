import { SET_FOLLOW_USER, SET_ALL_FOLLOW_USER, SET_UNFOLLOW_USER } from '../actions/relationship'

const initialState = {
    followers: []
}

export default (state=initialState, action) => {
    switch (action.type) {
        case SET_ALL_FOLLOW_USER:
            return action.follows
        case SET_FOLLOW_USER:
            return action.follow
        case SET_UNFOLLOW_USER:
            return action.follow
        default:
            return state
    }
}