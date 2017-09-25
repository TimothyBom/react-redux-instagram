import { combineReducers } from 'redux'
import currentUser from './currentUser'
import user from './user'
import posts from './posts'
import comments from './comments'
import followers from './relationship'
import search from './search'
import votes from './votes'

export default combineReducers({
    currentUser,
    user,
    posts,
    comments,
    followers,
    search,
    votes
})