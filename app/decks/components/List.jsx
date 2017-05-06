import React, { PureComponent, PropTypes } from 'react'

class List extends PureComponent {
  static propTypes = {
    decks: PropTypes.array.isRequired,
    showDetails: PropTypes.func.isRequired,
  }

  render() {
    return (
      <ul>
        {this.props.decks.map(deck => (
          <li>
            <a onClick={() => this.props.showDetails(deck.id)}>
              {deck.name}
            </a>
          </li>
        ))}
      </ul>
    )
  }
}

export default List
