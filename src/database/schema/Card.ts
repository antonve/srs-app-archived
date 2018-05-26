import RxDB, { RxCollectionCreator, RxJsonSchema } from 'rxdb'

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

export const CardCollectionCreator: RxCollectionCreator = {
  name: 'cards',
  schema: cardSchema,
  methods: {},
  // @ts-ignore
  sync: true,
}
