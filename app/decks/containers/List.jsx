import React, { Component, PropTypes } from 'react'
import List from './../components/List'

class ListContainer extends Component {
  static propTypes = {
    decks: PropTypes.array.isRequired,
  }

  showDetails = () => {}

  render() {
    return (
      <List
        decks={this.props.decks}
        showDetails={this.showDetails}
      />
    )
  }
}

export default ListContainer
