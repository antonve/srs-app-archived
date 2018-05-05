class Card {
  deckID: int
  cardType: int
  fields: Object
  tags: Array

  constructor(deckID: int, cardType: int, fields: Object, tags: Array) {
    this.deckID = deckID
    this.cardType = cardType
    this.fields = fields
    this.tags = tags
  }
}
