import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import authActions from '../../auth/actions'

class Header extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.number,
    }),
    logout: PropTypes.func.isRequired,
  }

  nav() {
    const { currentUser } = this.props

    // Change menu items when we're logged out
    let menu;
    if (currentUser === null) {
      menu = (
        <ul className="menu-bar condense">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      )
    } else {
      menu = (
        <ul className="vertical medium-horizontal menu-bar condense">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/user">Users</Link></li>
          <li><Link to={`/user/${currentUser.id}`}>Profile</Link></li>
          <li><Link to="/login" onClick={() => this.props.logout()}>Logout</Link></li>
        </ul>
      )
    }

    return (
      <nav className="small-6 medium-9 menu-group-right">
        {menu}
      </nav>
    )
  }

  render() {
    return (
      <header className="grid-block app-header menu-group">
        <div className="small-6 medium-3 logo">
          <Link to="/">SRS-Project</Link>
        </div>
        {::this.nav()}
      </header>
    )
  }
}

const mapStateToProps = state => ({
  ...state.session,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
