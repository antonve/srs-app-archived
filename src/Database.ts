import RxDB, { RxCollectionCreator, QueryChangeDetector, RxJsonSchema, RxDatabase, RxCollection } from 'rxdb'
import * as pouchdbAdapterIdb from 'pouchdb-adapter-idb'
import { Card } from 'src/model/interfaces'

QueryChangeDetector.enable()
QueryChangeDetector.enableDebugging()

RxDB.plugin(require('pouchdb-adapter-idb'))

const cardSchema: RxJsonSchema = {
  title: 'card schema',
  version: 0,
  type: 'object',
  properties: {
    ID: {
      type: 'string',
      primary: true,
    },
    deckID: {
      type: 'string',
      index: true,
    },
    cardTypeID: {
      type: 'number',
    },
    fields: {
      type: 'object',
      properties: {
        front: {
          type: 'string',
        },
        back: {
          type: 'string',
        },
      },
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['ID', 'fields'],
}

const collections: (RxCollectionCreator)[] = [
  {
    name: 'cards',
    schema: cardSchema,
    methods: {},
    // @ts-ignore
    sync: true,
  },
]

export interface CardSchema {
  ID: number
  deckID: number
  fields: string[]
  tags: string[]
}

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
