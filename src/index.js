import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import jwt from 'jsonwebtoken'
import reducer from './reducers'
import { setAuthorization } from './utils/setAuthorization'
import { setCurrentUser } from './actions/login'
import App from './App'
import './style.css'

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

if (localStorage.jwtToken) {
    setAuthorization(localStorage.jwtToken)
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)