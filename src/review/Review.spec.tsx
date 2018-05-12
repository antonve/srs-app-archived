import * as React from 'react'
import { create } from 'react-test-renderer'

import { Review } from './Review'
import { Card } from '../data/Card'
import { ViewState } from '../cards/CardRenderer'

test('Review shows empty state', () => {
  const component = create(<Review />)
  let tree = component.toJSON()
  expect(tree).toBe('Nothing to review.')
})

describe('Review with proper card data', () => {
  const subject = (viewState: ViewState) => {
    const fields = {
      front: 'front of card',
      back: 'back of card',
    }
    const card: Card = {
      deckID: 1,
      cardTypeID: 1,
      tags: [],
      fields,
    }
    const state = {
      time: 0,
      viewState,
    }

    return create(<Review card={card} reviewState={state} />)
  }

  it('renders front card content on load', () => {
    const tree = subject(ViewState.Front).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders back card content on clicking show', () => {
    const tree = subject(ViewState.Back).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
