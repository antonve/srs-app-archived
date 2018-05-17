import { Card } from 'src/data/Card'

export interface Deck {
  deckID: number
  deckName: string
  cards: Array<Card>
  tags: Array<string>
}
