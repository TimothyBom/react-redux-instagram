import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest, isAuthenticated }) => (
    <Route
        {...rest}
        render={props =>
        isAuthenticated
        ? <Redirect to={{ pathname: '/' }}/>
        : <Component {...props}/>}
    />
)

export default PublicRoute