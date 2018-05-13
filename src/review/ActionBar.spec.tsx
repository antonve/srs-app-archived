import * as React from 'react'
import { create } from 'react-test-renderer'

import { ActionBar } from 'src/review/ActionBar'
import { ViewState } from 'src/model/interfaces'

test('ActionBar shows `reveal state` button on init', () => {
  const component = create(<ActionBar viewState={ViewState.Front} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('ActionBar shows grading buttons on reveal', () => {
  const component = create(<ActionBar viewState={ViewState.Back} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
