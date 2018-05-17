import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

import { ActionBar } from 'src/review/ActionBar'
import { ViewState } from 'src/model/interfaces'
import { Button } from 'src/ui/components'

describe('ActionBar', () => {
  const initialProps = {
    viewState: ViewState.Front,
    revealHandler: jest.fn(),
    gradeHandler: jest.fn(),
  }

  test('shows `reveal state` button on init', () => {
    const component = <ActionBar {...initialProps} />

    let tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('shows grading buttons on reveal', () => {
    const props = {
      ...initialProps,
      viewState: ViewState.Back,
    }
    const component = create(<ActionBar {...props} />)

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('triggers revealHandler after clicking reveal', () => {
    const props = initialProps
    const tree = shallow(<ActionBar {...props} />)

    tree.find(Button).simulate('click')
    expect(props.revealHandler).toHaveBeenCalled()
  })

  test('triggers gradeHandler when clicking grading button', () => {
    const props = {
      ...initialProps,
      viewState: ViewState.Back,
    }
    const tree = shallow(<ActionBar {...props} />)

    tree.find(Button).forEach(button => button.simulate('click'))
    expect(props.gradeHandler).toHaveBeenCalledTimes(2)
  })
})
