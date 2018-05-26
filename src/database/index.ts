import RxDB, { RxCollectionCreator, QueryChangeDetector, RxDatabase, RxCollection } from 'rxdb'
import * as pouchdbAdapterIdb from 'pouchdb-adapter-idb'

import { Card } from 'src/model'
import { CardCollectionCreator } from 'src/database/schema'
import { seed } from 'src/database/seed'

QueryChangeDetector.enable()
QueryChangeDetector.enableDebugging()

RxDB.plugin(require('pouchdb-adapter-idb'))

const collections: (RxCollectionCreator)[] = [CardCollectionCreator]

export interface DatabaseCollection {
  cards: RxCollection<Card>
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
