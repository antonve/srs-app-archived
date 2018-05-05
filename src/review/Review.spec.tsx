import * as React from 'react'
import { Review } from './Review'
import { create } from 'react-test-renderer'

test('Review shows empty state', () => {
  const component = create(<Review />)
  let tree = component.toJSON()
  expect(tree).toBe('Nothing to review.')
})
