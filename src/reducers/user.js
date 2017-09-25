import { SET_USER_PAGE, SET_USER_INFO } from '../actions/user'

const initialState = {
    user: {}
}

export default (state=initialState, action) => {
    switch (action.type) {
        case SET_USER_PAGE:
            return {
                user: action.user
            }
        case SET_USER_INFO:
            return {
                user: action.user
            }
        default:
            return state
    }
}