import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import 'font-awesome/scss/font-awesome.scss'
import Header from './header'
import '../styles/app.scss'

import authActions from '../../auth/actions'

class AppLayout extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(authActions.loadSession())
  }

  render() {
    return (
      <div className="vertical grid-block">
        <Header />
        <div className="grid-block content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect()(AppLayout)
