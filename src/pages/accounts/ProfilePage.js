import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo, setEditUser } from '../../actions/user'
import { getUpdateToken } from '../../actions/login'
import AccountsLayout from '../../components/layout/AccountsLayout'
import ProfileForm from './ProfileForm'

class ProfilePage extends React.Component {
    componentWillMount() {
        this.props.getUserInfo(this.props.currentUser.user.username)
    }

    render() {
        const { currentUser, userInfo, setEditUser, getUpdateToken } = this.props

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
                <ProfileForm
                    currentUser={currentUser}
                    userInfo={userInfo.user}
                    setEditUser={setEditUser}
                    getUpdateToken={getUpdateToken}
                />
            </AccountsLayout>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        userInfo: state.user,
    }
}

export default connect(mapStateToProps, {
    getUserInfo,
    setEditUser,
    getUpdateToken })(ProfilePage)