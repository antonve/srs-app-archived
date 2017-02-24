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

  constructor(props) {
    super(props)

    this.handleAuth = this.handleAuth.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props

    if (this.isAuthenticated) {
      browserHistory.push('/')
    } else {
      dispatch(authActions.reset())
    }
  }

  componentWillReceiveProps() {
    if (this.isAuthenticated) {
      browserHistory.push('/')
    }
  }

  handleAuth = (e) => {
    e.preventDefault()

    const { username, password } = this
    const { dispatch } = this.props
    const params = {
      username: username.value,
      password: password.value,
    }

    dispatch(authActions.login(params))
  }

  get isAuthenticated() {
    return this.props.currentUser !== null
  }

  get errors() {
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
        <label>Username</label>
        <input
          ref={(ref) => { this.username = ref }}
          type="text"
          placeholder="Username"
          required
          autoFocus
        />
        <label>Password</label>
        <input
          ref={(ref) => { this.password = ref }}
          type="password"
          placeholder="Password"
          required
        />
        <div>
          <button type="submit" className="button">Log In</button>
          {this.errors}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  ...state.session,
})

export default connect(mapStateToProps)(AuthLogin)
