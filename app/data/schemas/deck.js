const schema = {
  title: 'deck schema',
  description: 'describes a simple deck',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true,
    },
    description: {
      type: 'string',
    },
    weight: {
      type: 'integer',
    },
  },
  required: ['name', 'weight'],
}

export default schema
