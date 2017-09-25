import React from 'react'
import { connect } from 'react-redux'
import SignupForm from './SignupForm'
import { getUserSignup, checkUserExist } from '../../actions/signup'

const SignupPage = props => (
    <div className="container mt-10">
        <h1 className="text-center mb-4">Signup Page</h1>
        <div className="row justify-content-center">
            <SignupForm getUserSignup={props.getUserSignup} checkUserExist={props.checkUserExist} />
        </div>
    </div>
)

export default connect(null, {
    getUserSignup,
    checkUserExist })(SignupPage)