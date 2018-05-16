import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import { ActionBar } from 'src/review/ActionBar'
import { ViewState } from 'src/model/interfaces'
import { Button } from 'src/ui/components'

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

test('ActionBar triggers revealHandler after clicking reveal', () => {
  const props = {
    viewState: ViewState.Front,
    revealHandler: jest.fn(),
    gradeHandler: jest.fn(),
  }
  const tree = shallow(<ActionBar {...props} />)

  tree.find(Button).simulate('click')
  expect(props.revealHandler).toHaveBeenCalled()
})

test('ActionBar triggers gradeHandler when clicking grading button', () => {
  const props = {
    viewState: ViewState.Back,
    revealHandler: jest.fn(),
    gradeHandler: jest.fn(),
  }
  const tree = shallow(<ActionBar {...props} />)

  tree
    .find(Button)
    .first()
    .simulate('click')
  expect(props.gradeHandler).toHaveBeenCalled()
})
