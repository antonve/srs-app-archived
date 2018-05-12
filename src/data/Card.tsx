import { ViewState } from '../cards/CardRenderer'

export interface Card {
  deckID: number
  cardTypeID: number
  fields: { [K in ViewState]: React.ReactNode }
  tags: Array<string>
}
