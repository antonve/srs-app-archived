import * as React from 'react'
import { Review } from './Review'
import { create } from 'react-test-renderer'

test('Review shows empty state', () => {
  const component = create(<Review />)
  let tree = component.toJSON()
  expect(tree).toBe('Nothing to review.')
})

test('Review shows card when one is given', () => {
  const card = jest.fn()
  const component = create(<Review card={card} />)
  let tree = component.toJSON()
  expect(tree).not.toBe('Nothing to review.')
})
