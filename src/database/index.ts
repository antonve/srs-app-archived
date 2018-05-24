import RxDB, { RxCollectionCreator, QueryChangeDetector, RxJsonSchema, RxDatabase, RxCollection } from 'rxdb'
import * as pouchdbAdapterIdb from 'pouchdb-adapter-idb'
import { CardSchema, CardCollectionCreator } from 'src/database/schema'

QueryChangeDetector.enable()
QueryChangeDetector.enableDebugging()

RxDB.plugin(require('pouchdb-adapter-idb'))

const collections: (RxCollectionCreator)[] = [CardCollectionCreator]

export interface DatabaseCollection {
  cards: RxCollection<CardSchema>
}

const seed = async (db: RxDatabase) => {
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

const _create = async function() {
  const db = await RxDB.create({ name: 'srsdb', adapter: 'idb' })

  await db.waitForLeadership()
  await Promise.all(collections.map(colData => db.collection(colData)))
  await seed(db)

  return db
}

let dbPromise: Promise<RxDatabase> = null

export function get() {
  if (!dbPromise) {
    dbPromise = _create()
  }

  return dbPromise
}
