import * as React from 'react'
import { ReviewState } from 'src/review/Review'
import { ViewState } from 'src/cards/CardRenderer'
import { Button } from 'src/ui/components'

export interface ActionBarProps {
  reviewState: ReviewState
}

export class ActionBar extends React.Component<ActionBarProps, {}> {
  renderFrontActions = () => {
    return <Button label="Reveal card" />
  }

  renderBackActions = () => {
    return (
      <>
        <Button label="Wrong" />
        <Button label="Correct" />
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
