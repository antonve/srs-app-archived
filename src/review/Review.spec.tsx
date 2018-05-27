import * as React from 'react'
import { create } from 'react-test-renderer'

import { Review } from 'src/review/Review'
import { Card, ViewState } from 'src/model'

test('Review shows empty state', () => {
  const component = create(<Review handleReveal={jest.fn()} handleGrade={jest.fn()} />)
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
      cardTypeID: '1',
      tags: [],
      fields,
    }

    return create(<Review card={card} viewState={viewState} handleReveal={jest.fn()} handleGrade={jest.fn()} />)
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
