import * as React from 'react'
import { Deck } from 'src/data/Deck'

export interface DeckMenuProps {
  deck?: Deck
}

export const DeckList: React.SFC<DeckMenuProps> = ({ deck }) => {
  if (!deck) {
    return <>No decks created.</>
  }
  return <>{deck.deckName}</>
}
