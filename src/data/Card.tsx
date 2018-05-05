export interface Card {
  deckID: number
  cardType: number
  fields: { [field: string]: any }
  tags: Array<string>
}
