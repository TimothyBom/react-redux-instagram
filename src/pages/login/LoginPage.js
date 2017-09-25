import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { getUserLogin } from '../../actions/login'

const LoginPage = props => (
    <div className="container mt-10">
        <h1 className="text-center mb-4">Login Page</h1>
        <div className="row justify-content-center">
            <LoginForm getUserLogin={props.getUserLogin} />
        </div>
    </div>
)

export default connect(null, { getUserLogin })(LoginPage)