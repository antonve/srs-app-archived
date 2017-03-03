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

  constructor(props) {
    super(props)

    this.handleAuth = this.handleAuth.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props

    if (this.isAuthenticated) {
      browserHistory.push('/')
    } else {
      this.username.focus()
      dispatch(authActions.reset())
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isAuthenticated) {
      browserHistory.push('/')
    }

    // Auto login user after registering
    if (nextProps.registered === true && nextProps.errors !== null) {
      const { dispatch } = this.props
      dispatch(authActions.login(nextProps.registerData))
    }
  }

  handleAuth = (e) => {
    e.preventDefault()

    const { username, password, userDisplayName } = this
    const { dispatch } = this.props
    const params = {
      username: username.value,
      display_name: userDisplayName.value,
      password: password.value,
    }

    dispatch(authActions.register(params))
  }

  get isAuthenticated() {
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

  render() {
    return (
      <form onSubmit={::this.handleAuth}>
        {this.errors}
        <label>Username</label>
        <input
          ref={(ref) => { this.username = ref }}
          type="text"
          placeholder="Username"
          required
        />
        <label>Display Name</label>
        <input
          ref={(ref) => { this.userDisplayName = ref }}
          type="text"
          placeholder="Display Name"
          required
        />
        <label>Password</label>
        <input
          ref={(ref) => { this.password = ref }}
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
