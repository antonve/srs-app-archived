import RxDB, { RxCollectionCreator, RxJsonSchema } from 'rxdb'

const cardTypeSchema: RxJsonSchema = {
  title: 'card type schema',
  version: 0,
  type: 'object',
  properties: {
    ID: {
      type: 'string',
      primary: true,
    },
    name: { type: 'string' },
    fields: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ID: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
    template: {
      type: 'object',
      properties: {
        front: { type: 'string' },
        back: { type: 'string' },
        styles: { type: 'string' },
      },
    },
  },
  required: ['ID', 'name', 'fields', 'template'],
}

export const CardTypeCollectionCreator: RxCollectionCreator = {
  name: 'cardTypes',
  schema: cardTypeSchema,
  methods: {},
  // @ts-ignore
  sync: true,
}
