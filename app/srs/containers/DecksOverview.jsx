import React, { Component } from 'react'
import DeckItem from './../components/DeckItem'
import getDatabase from '../../data'

import './../styles/decks_overview.scss'

class DecksOverviewContainer extends Component {
  state = {
    decks: [],
    name: '',
    color: '',
  }

  componentDidMount() {
    const self = this

    getDatabase('deck').then((col) => {
      self.col = col
      col.query().sort({ name: 1 }).$.subscribe((decks) => {
        if (!decks) {
          return
        }
        this.setState({ decks })
      })
    })
  }

  addDeck() {
    const { name, color } = this.state

    if (name && color) {
      this.col.insert({ name, color })
      this.setState({ name: '', color: '' })
    }
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleColorChange = (event) => {
    this.setState({
      color: event.target.value,
    })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.addDeck()
    }
  }

  viewDeck = (deck) => {
    this.setState({
      color: deck.color,
    })
  }

  render() {
    return (
      <div>
        <div className="box">
          <table className="list boxxed" style={{ background: this.state.color }}>
            <thead>
              <tr>
                <th>Decks</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.decks.length === 0 &&
                <tr><td>No decks created yet</td></tr>
              }
              {
                this.state.decks.map(deck =>
                  <DeckItem key={deck.get('name')} deck={deck} onItemClick={this.viewDeck}/>,
                )
              }
            </tbody>
          </table>
        </div>

        <div className="box">
          <h3>Add Deck</h3>
          <div className="box-content">
            <label htmlFor="name">
              Deck Name
              <input
                type="text" id="name" placeholder="Name" value={this.state.name}
                onChange={this.handleNameChange} onKeyPress={this.handleKeyPress}
              />
            </label>
            <label htmlFor="color">
              Color
              <input
                type="text" id="color" placeholder="Color" value={this.state.color}
                onChange={this.handleColorChange} onKeyPress={this.handleKeyPress}
              />
            </label>
            <button className="success button" onClick={this.addDeck}>Insert a Deck</button>
          </div>
        </div>
      </div>
    )
  }
}

export default DecksOverviewContainer
