import { Card } from 'src/data/Card'

export interface Deck {
  deckID: number
  deckName: string
  cards: Card[]
  tags: Array<string>
}
