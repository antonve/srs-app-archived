import { RxDatabase } from 'rxdb'

export const seed = async (db: RxDatabase) => {
  await db.collections.cardTypes.upsert({
    ID: '1',
    name: 'test deck',
    fields: [{ ID: '1', name: 'kanji' }, { ID: '2', name: 'reading' }, { ID: '3', name: 'translation' }],
    templates: {
      front: '%{kanji}',
      back: '%{kanji} (%{reading}) -- %{translation}',
    },
  })
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
