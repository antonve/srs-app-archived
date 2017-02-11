import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import authActions from '../actions'

class AuthRegister extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      id: PropTypes.number,
    }),
    failed: PropTypes.bool,
    error: PropTypes.string,
  }

  componentDidMount() {
    const { dispatch } = this.props

    if (this.checkIfLoggedIn) {
      browserHistory.push('/')
    } else {
      this.username.focus()
      dispatch(authActions.reset())
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.checkIfLoggedIn) {
      browserHistory.push('/')
    }

    // Auto login user after registering
    if (nextProps.registered === true && nextProps.errors !== null) {
      const { dispatch } = this.props
      dispatch(authActions.login(nextProps.registerData))
    }
  }

  get checkIfLoggedIn() {
    return this.props.currentUser !== null
  }

  get errors() {
    const { failed, error } = this.props

    if (failed) {
      return (
        <div>
          {error}
        </div>
      )
    }

    return null
  }

  handleAuth = (e) => {
    e.preventDefault()

    const { username, password, displayName } = this.refs
    const { dispatch } = this.props
    const params = {
      username: username.value,
      display_name: displayName.value,
      password: password.value,
    }

    dispatch(authActions.register(params))
  }

  render() {
    return (
      <form onSubmit={::this.handleAuth}>
        {this.errors}
        <label>Username</label>
        <input
          ref="username"
          type="text"
          placeholder="Username"
          required
        />
        <label>Display name</label>
        <input
          ref="displayName"
          type="text"
          placeholder="Display name"
          required
        />
        <label>Password</label>
        <input
          ref="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" className="button">Register</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  ...state.session,
})

export default connect(mapStateToProps)(AuthRegister)
