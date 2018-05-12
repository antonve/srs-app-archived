import { ViewStates } from '../cards/CardRenderer'

export interface Card {
  deckID: number
  cardTypeID: number
  fields: { front: any; back: any }
  tags: Array<string>
}
