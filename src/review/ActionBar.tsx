import * as React from 'react'
import { ReviewState } from 'Review'
import { ViewStates } from '../cards/CardRenderer'

export interface ActionBarProps {
  reviewState: ReviewState
}

export class ActionBar extends React.Component<ActionBarProps, object> {
  renderFrontActions = () => {
    return 'reveal card'
  }

  renderBackActions = () => {
    return 'action buttons when card is revealed'
  }

  render() {
    switch (this.props.reviewState.viewState) {
      case ViewStates.Front:
        return this.renderFrontActions()
      case ViewStates.Back:
        return this.renderBackActions()
    }
  }
}
