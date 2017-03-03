import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Header extends React.Component {
  static nav() {
    // Change menu items when we're logged out
    const menu = (
      <ul className="vertical medium-horizontal menu-bar condense">
        <li><Link to="/">Decks</Link></li>
      </ul>
    )

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
        {Header.nav()}
      </header>
    )
  }
}

const mapStateToProps = state => ({
  ...state.session,
})

export default connect(mapStateToProps)(Header)
