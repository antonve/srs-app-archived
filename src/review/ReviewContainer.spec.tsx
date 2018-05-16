import * as React from 'react'
import { shallow } from 'enzyme'

import { ReviewContainer } from 'src/review/ReviewContainer'
import { ViewState } from 'src/model/interfaces'

it('reveal changes the StateView to Back', () => {
  const wrapper = shallow(<ReviewContainer />)
  const instance: ReviewContainer = wrapper.instance() as ReviewContainer

  expect(instance.state.reviewState.viewState).toBe(ViewState.Front)
  instance.reveal()
  expect(instance.state.reviewState.viewState).toBe(ViewState.Back)
})
