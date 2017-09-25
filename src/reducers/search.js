import { isEmpty } from 'lodash'
import { SET_SEARCH_USER } from '../actions/search'

const initialState = {
    users: []
}

export default (state=initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_USER:
            if (!isEmpty(action.user)) {
                return action.user
            } else {
                return initialState
            }
        default:
            return state
    }
}