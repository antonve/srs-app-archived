export interface Card {
  deckID: number
  cardTypeID: number
  fields: { [field: string]: any }
  tags: Array<string>
}
