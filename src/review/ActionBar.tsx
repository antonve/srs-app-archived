import * as React from 'react'
import { ReviewState } from './Review'
import { ViewState } from '../cards/CardRenderer'

export interface ActionBarProps {
  reviewState: ReviewState
}

export class ActionBar extends React.Component<ActionBarProps, object> {
  renderFrontActions = () => {
    return 'reveal card'
  }

  renderBackActions = () => {
    return (
      <>
        <span>Wrong</span>
        <span>Correct</span>
      </>
    )
  }

  render() {
    switch (this.props.reviewState.viewState) {
      case ViewState.Front:
        return this.renderFrontActions()
      case ViewState.Back:
        return this.renderBackActions()
    }
  }
}
