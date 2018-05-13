import * as React from 'react'
import { create } from 'react-test-renderer'

import { ActionBar } from 'src/review/ActionBar'
import { ViewState } from 'src/model/interfaces'

const actionBar = (viewState: ViewState) => {
  return <ActionBar viewState={viewState} revealHandler={jest.fn()} gradeHandler={jest.fn()} />
}
test('ActionBar shows `reveal state` button on init', () => {
  const component = create(actionBar(ViewState.Front))

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('ActionBar shows grading buttons on reveal', () => {
  const component = create(actionBar(ViewState.Back))

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
