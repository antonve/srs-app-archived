import RxDB, { RxDatabaseCreator, RxCollectionCreator, QueryChangeDetector, RxDatabase, RxCollection } from 'rxdb'
import * as pouchdbAdapterIdb from 'pouchdb-adapter-idb'

import { Card, CardType } from 'src/model'
import { CardCollectionCreator, CardTypeCollectionCreator } from 'src/database/schema'
import { seed } from 'src/database/seed'

const databaseConfig: RxDatabaseCreator = { name: 'srsdb', adapter: 'idb' }

QueryChangeDetector.enable()
QueryChangeDetector.enableDebugging()

RxDB.plugin(require('pouchdb-adapter-idb'))

const collections: (RxCollectionCreator)[] = [CardCollectionCreator, CardTypeCollectionCreator]

export interface DatabaseCollection {
  cards: RxCollection<Card>
  cardTypes: RxCollection<CardType>
}

const createDatabase = async function(creator: RxDatabaseCreator) {
  const db = await RxDB.create(creator)

  await db.waitForLeadership()
  await Promise.all(collections.map(colData => db.collection(colData)))
  await seed(db)

  return db
}

let databasePromise: Promise<RxDatabase> = null

export function get() {
  if (!databasePromise) {
    databasePromise = createDatabase(databaseConfig)
  }

  return databasePromise
}
