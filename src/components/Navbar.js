import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getUserLogout } from '../actions/login'
import { getSearchUser } from '../actions/search'
import Search from './Search'

class Navbar extends React.Component {
    setUserLogout(e) {
        e.preventDefault()
        this.props.getUserLogout()
        this.props.history.push('/login')
    }

    render() {
        const { isAuthenticated, user } = this.props.currentUser
        const { search, getSearchUser } = this.props

        const isLoggedIn = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={`/${user.username}`}><i className="fa fa-user-o fa-lg"></i></Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown"><i className="fa fa-ellipsis-v fa-lg"></i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="edit">Edit Profile</Link>
                        <Link className="dropdown-item" to="password">Change Password</Link>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={this.setUserLogout.bind(this)}>Logout</a>
                    </div>
                </li>
            </ul>
        )

        const isNotLogin = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-light _tpnch">
                <div className="container">
                    <a className="navbar-brand" href="/">Instagram</a>
                    
                    <div className="collapse navbar-collapse justify-content-center">
                        <div className="navbar-nav ml-auto">
                            <Search search={search} getSearchUser={getSearchUser} />
                        </div>
                        { isAuthenticated === true ? isLoggedIn : isNotLogin }
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    let search = Object.assign([], state.search)
    return {
        currentUser: state.currentUser,
        search: search
    }
}

export default withRouter(connect(mapStateToProps, {
    getUserLogout,
    getSearchUser })(Navbar))