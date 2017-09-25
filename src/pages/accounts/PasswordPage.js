import React from 'react'
import { connect } from 'react-redux'
import { checkPassword, updateUserPassword } from '../../actions/user'
import AccountsLayout from '../../components/layout/AccountsLayout'
import PasswordForm from './PasswordForm'

class PasswordPage extends React.Component {
    render() {
        const { currentUser, checkPassword, updateUserPassword } = this.props

        const existAvatar = (
            <div className="_l8yre _5g4e2">
                <img className="_fya1f" src={currentUser.user.avatar} alt="" />   
            </div>
        )

        const noAvatar = (
            <div className="_l8yre _5g4e2">
                <img className="_fya1f" src="https://res.cloudinary.com/timothybom/image/upload/v1505211426/avatar_mf1yiz.jpg" alt="" />   
            </div>
        )

        return (
            <AccountsLayout>
                <div className="row _1eg8c">
                    {currentUser.user.avatar ? existAvatar : noAvatar}
                    <h1 className="_9dz61">timothy.bom</h1>
                </div>
                <PasswordForm
                    currentUser={currentUser}
                    checkPassword={checkPassword}
                    updateUserPassword={updateUserPassword}
                />
            </AccountsLayout>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, { checkPassword, updateUserPassword })(PasswordPage)