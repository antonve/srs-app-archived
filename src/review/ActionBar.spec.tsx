import * as React from 'react'
import { create } from 'react-test-renderer'

import { ActionBar } from 'src/review/ActionBar'
import { ViewState } from 'src/model/interfaces'

test('ActionBar shows `reveal state` button on init', () => {
  const state = { time: 0, viewState: ViewState.Front }
  const component = create(<ActionBar reviewState={state} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('ActionBar shows grading buttons on reveal', () => {
  const state = { time: 0, viewState: ViewState.Back }
  const component = create(<ActionBar reviewState={state} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
