import * as React from 'react'
import { Deck } from 'src/data/Deck'

interface DeckRendererProps {
  deck: Deck
}

export const DeckRenderer: React.SFC<DeckRendererProps> = ({ deck }) => {
  return <>{deck}</>
}
