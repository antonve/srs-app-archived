import { ViewStates } from '../cards/CardRenderer'

export interface Card {
  deckID: number
  cardTypeID: number
  fields: { [K in ViewStates]: any }
  tags: Array<string>
}
