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
    name: 'decks',
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
  heroes: RxCollection<CardSchema>
}

let dbPromise: Promise<RxDatabase> = null

const _create = async function() {
  console.log('DatabaseService: creating database..')
  const db = await RxDB.create({ name: 'srsdb', adapter: 'idb' })
  console.log('DatabaseService: created database')
  window['db'] = db // write to window for debugging

  // show leadership in title
  db.waitForLeadership().then(() => {
    console.log('isLeader now')
    document.title = '♛ ' + document.title
  })

  // create collections
  console.log('DatabaseService: create collections')
  await Promise.all(collections.map(colData => db.collection(colData)))

  // hooks
  console.log('DatabaseService: add test data')
  await db.collections.decks.insert({
    ID: '1',
    deckID: '1',
    fields: {
      front: 'test front',
      back: 'test back',
    },
    tags: [],
  })

  return db
}

export function get() {
  if (!dbPromise) dbPromise = _create()
  return dbPromise
}
