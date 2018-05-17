import * as React from 'react'
import { Deck } from 'src/data/Deck'
import { DeckRenderer } from 'src/decks/DeckRenderer'

export interface DeckMenuProps {
  deck?: Deck
}

export class DeckMenu extends React.Component<DeckMenuProps, {}> {
  public static defaultProps: Partial<DeckMenuProps> = {}

  render() {
    const { deck } = this.props

    if (!deck) {
      return <>No decks available!</>
    }

    return '//todo show deck content'
  }
}
