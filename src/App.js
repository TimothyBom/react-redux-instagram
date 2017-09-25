import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import MainPage from './pages/main/MainPage'
import SignupPage from './pages/signup/SignupPage'
import LoginPage from './pages/login/LoginPage'
import UserPage from './pages/user/UserPage'
import ProfilePage from './pages/accounts/ProfilePage'
import PasswordPage from './pages/accounts/PasswordPage'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'

const App = ({ isAuthenticated }) => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" component={MainPage} isAuthenticated={isAuthenticated} />
      <PublicRoute exact path="/signup" component={SignupPage} isAuthenticated={isAuthenticated} />
      <PublicRoute exact path="/login" component={LoginPage} isAuthenticated={isAuthenticated} />
      <PrivateRoute exact path="/edit" component={ProfilePage} isAuthenticated={isAuthenticated} />
      <PrivateRoute exact path="/password" component={PasswordPage} isAuthenticated={isAuthenticated} />
      <Route exact path="/:username" component={UserPage} />
    </Switch>
  </Router>
)

const mapStateToProps = state => {
  return {
      isAuthenticated: state.currentUser.isAuthenticated
  }
}

export default connect(mapStateToProps)(App)