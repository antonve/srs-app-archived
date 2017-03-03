import React, { PropTypes, Component } from 'react'

export default class DeckItem extends Component {
  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    deck: PropTypes.shape({
      get: PropTypes.func.isRequired,
    }).isRequired,
  }
  constructor(props) {
    super(props)
    this.itemClick = this.itemClick.bind(this)
  }
  itemClick() {
    this.props.onItemClick(this.props.deck)
  }
  render() {
    return (
      <tr className="clickable" onClick={this.itemClick}>
        <td className="name">
          <span className="color-box" style={{ background: this.props.deck.get('color') }}/>
          {this.props.deck.get('name')}
        </td>
      </tr>
    )
  }
}
