import * as React from 'react'
import { create } from 'react-test-renderer'

import { ActionBar } from './ActionBar'
import { ViewStates } from '../cards/CardRenderer'

test('ActionBar shows `reveal state` button on init', () => {
  const state = { time: 0, viewState: ViewStates.Front }
  const component = create(<ActionBar reviewState={state} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('ActionBar shows grading buttons on reveal', () => {
  const state = { time: 0, viewState: ViewStates.Back }
  const component = create(<ActionBar reviewState={state} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
