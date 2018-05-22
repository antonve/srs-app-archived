import * as React from 'react'
import { shallow } from 'enzyme'

import { ReviewContainer } from 'src/review/ReviewContainer'
import { ViewState, Grade } from 'src/model/interfaces'

describe('ReviewContainer', () => {
  it('reveal changes the StateView to Back', () => {
    const wrapper = shallow(<ReviewContainer />)
    const instance: ReviewContainer = wrapper.instance() as ReviewContainer

    expect(instance.state.reviewState.viewState).toBe(ViewState.Front)
    instance.reveal()
    expect(instance.state.reviewState.viewState).toBe(ViewState.Back)
  })

  it('grading changes card', () => {
    const wrapper = shallow(<ReviewContainer />)
    const instance: ReviewContainer = wrapper.instance() as ReviewContainer

    const card = instance.state.card
    instance.grade(Grade.Correct)
    expect(instance.state.card).not.toEqual(card)
  })
})
