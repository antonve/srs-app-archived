import RxDB, { RxCollectionCreator, QueryChangeDetector, RxJsonSchema, RxDatabase, RxCollection } from 'rxdb'
import * as pouchdbAdapterIdb from 'pouchdb-adapter-idb'

QueryChangeDetector.enable()
QueryChangeDetector.enableDebugging()

RxDB.plugin(require('pouchdb-adapter-idb'))

const heroSchema: RxJsonSchema = {
  title: 'hero schema',
  description: 'describes a simple hero',
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true,
    },
    color: {
      type: 'string',
    },
  },
  required: ['color'],
}

const collections: (RxCollectionCreator)[] = [
  {
    name: 'heroes',
    schema: heroSchema,
    methods: {
      hpPercent() {
        return this.hp / this.maxHP * 100
      },
    },
    // @ts-ignore
    sync: true,
  },
]

export interface HeroSchema {
  name: string
  color: string
}

export interface DatabaseCollection {
  heroes: RxCollection<HeroSchema>
}

let dbPromise: Promise<RxDatabase> = null

const _create = async function() {
  console.log('DatabaseService: creating database..')
  const db = await RxDB.create({ name: 'heroesreactdb', adapter: 'idb' })
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
  console.log('DatabaseService: add hooks')
  db.collections.heroes.preInsert((docObj: any) => {
    const color = docObj.color
    return db.collections.heroes
      .findOne({ color })
      .exec()
      .then((has: any) => {
        if (has != null) {
          alert('another hero already has the color ' + color)
          throw new Error('color already there')
        }
        return db
      })
  })
  return db
}

export function get() {
  if (!dbPromise) dbPromise = _create()
  return dbPromise
}
