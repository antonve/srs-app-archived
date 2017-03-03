import * as RxDB from 'rxdb'
import deckSchema from '~/data/schemas/deckSchema'

RxDB.plugin(require('pouchdb-adapter-websql'))
RxDB.plugin(require('pouchdb-replication'))  // enable syncing
RxDB.plugin(require('pouchdb-adapter-http')) // enable syncing over http

console.log(`hostname:${window.location.hostname}`)
const syncURL = `http://${window.location.hostname}:10102/`
const shouldSync = true

export default function getDatabase(collectionName) {
  // Set up the RxDB database
  return RxDB.create(
    'srs',   // <- name
    'websql',     // <- storage-adapter
    'srsPassword', // <- password (optional)
    true,          // <- multiInstance (optional)
  ).then((db) => {
    // Return the collection
    switch (collectionName) {
      case 'deck':
        return db.collection('deck', deckSchema)
      default:
        throw new Error('Invalid collectionName')
    }
  }).then((col) => {
    // IF we want to sync with a couch, we do so here and return the collection
    if (shouldSync) {
      col.sync(`${syncURL}${collectionName}/`)
    }
    return col
  })
}
