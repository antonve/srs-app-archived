import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import authActions from '../actions'

class AuthLogin extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      id: PropTypes.number,
    }),
    failed: PropTypes.bool,
  }

  componentDidMount() {
    const { dispatch } = this.props

    if (this.checkIfLoggedIn()) {
      browserHistory.push('/')
    } else {
      this.username.focus()
      dispatch(authActions.reset())
    }
  }

  componentWillReceiveProps() {
    if (this.checkIfLoggedIn()) {
      browserHistory.push('/')
    }
  }

  checkIfLoggedIn() {
    return this.props.currentUser !== null
  }

  handleAuth(e) {
    e.preventDefault()

    const { username, password } = this
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
      <form onSubmit={this.handleAuth}>
        <label htmlFor={this.username}>Username</label>
        <input
          ref={(c) => { this.username = c; }}
          type="text"
          placeholder="Username"
          required
        />
        <label htmlFor={this.password}>Password</label>
        <input
          ref={(c) => { this.password = c; }}
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
