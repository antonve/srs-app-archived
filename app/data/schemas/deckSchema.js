
const schema = {
  title: 'deck schema',
  description: 'describes a simple deck',
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

export default schema
