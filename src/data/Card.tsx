export class Card {
  deckID: number
  cardType: number
  fields: { [field: string]: any }
  tags: Array<string>

  constructor(deckID: number, cardType: number, fields: { [field: string]: any }, tags: Array<string>) {
    this.deckID = deckID
    this.cardType = cardType
    this.fields = fields
    this.tags = tags
  }
}
