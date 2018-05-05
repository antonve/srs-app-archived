import * as React from 'react'
import { create } from 'react-test-renderer'

import { Review } from './Review'
import { Card } from '../data/Card'
import { ViewStates } from '../cards/CardRenderer'

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
  const card = {
    deckID: 1,
    cardType: 1,
    tags: [],
    fields,
  }
  const state = {
    time: 0,
    viewState: ViewStates.Front,
  }

  const component = create(<Review card={card} reviewState={state} />)
  let tree = component.toJSON()

  expect(tree).not.toBe('Nothing to review.')

  expect(tree[0]).toEqual(expect.stringContaining(fields.front))
  expect(tree[0]).not.toEqual(expect.stringContaining(fields.back))
})
