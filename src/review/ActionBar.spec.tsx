import * as React from 'react'
import { create } from 'react-test-renderer'

import { ActionBar } from 'src/review/ActionBar'
import { ViewState } from 'src/model/interfaces'

test('ActionBar shows `reveal state` button on init', () => {
  const props = {
    viewState: ViewState.Front,
    revealHandler: jest.fn(),
    gradeHandler: jest.fn(),
  }
  const component = <ActionBar {...props} />

  let tree = create(component).toJSON()
  expect(tree).toMatchSnapshot()
})

test('ActionBar shows grading buttons on reveal', () => {
  const props = {
    viewState: ViewState.Back,
    revealHandler: jest.fn(),
    gradeHandler: jest.fn(),
  }
  const component = create(<ActionBar {...props} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
