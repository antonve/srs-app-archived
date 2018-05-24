import { RxDatabase } from 'rxdb'

export const seed = async (db: RxDatabase) => {
  await db.collections.cards.upsert({
    ID: '1',
    deckID: '1',
    fields: {
      front: 'test front',
      back: 'test back',
    },
    tags: [],
  })
}
