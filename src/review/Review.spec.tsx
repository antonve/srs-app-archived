import * as React from 'react'
import { create } from 'react-test-renderer'

import { Review } from './Review'
import { Card } from '../data/Card'

test('Review shows empty state', () => {
  const component = create(<Review />)
  let tree = component.toJSON()
  expect(tree).toBe('Nothing to review.')
})

test('Review renders card content', () => {
  const fields = {
    front: 'front of card',
    back: 'back of card',
  }
  const card = new Card(1, 1, fields, [])

  const component = create(<Review card={card} />)
  let tree = component.toJSON()

  expect(tree).not.toBe('Nothing to review.')

  expect(tree).toEqual(expect.stringContaining(fields.front))
  expect(tree).not.toEqual(expect.stringContaining(fields.back))
})
