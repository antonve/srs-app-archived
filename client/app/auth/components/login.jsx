import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import authActions from '../actions'

class AuthLogin extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      id: PropTypes.number,
    }),
    failed: PropTypes.bool,
  }

  componentDidMount() {
    const { dispatch } = this.props

    if (this.checkIfLoggedIn) {
      browserHistory.push('/')
    } else {
      dispatch(authActions.reset())
    }
  }

  componentWillReceiveProps() {
    if (this.checkIfLoggedIn) {
      browserHistory.push('/')
    }
  }

  get checkIfLoggedIn() {
    return this.props.currentUser !== null
  }

  handleAuth = (e) => {
    const { username, password } = this.refs
    const { dispatch } = this.props
    const params = {
      username: username.value,
      password: password.value,
    }

    dispatch(authActions.login(params))
  }

  errors() {
    const { failed } = this.props

    if (failed) {
      return (
        <span className="button alert no-cursor">
          Invalid Credentials
        </span>
      )
    }

    return null
  }

  render() {
    return (
      <form onSubmit={::this.handleAuth}>
        <label>Username</label>
        <input
          ref="username"
          type="text"
          placeholder="Username"
          required
          autoFocus
        />
        <label>Password</label>
        <input
          ref="password"
          type="password"
          placeholder="Password"
          required
        />
        <div>
          <button type="submit" className="button">Log In</button>
          {this.errors()}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  ...state.session,
})

export default connect(mapStateToProps)(AuthLogin)
