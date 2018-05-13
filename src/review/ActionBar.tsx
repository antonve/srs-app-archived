import * as React from 'react'
import { ViewState } from 'src/model/interfaces'
import { Button } from 'src/ui/components'

export interface ActionBarProps {
  viewState: ViewState
  revealHandler: () => void
}

export class ActionBar extends React.Component<ActionBarProps, {}> {
  renderFrontActions = () => {
    return <Button label="Reveal card" onClick={this.props.revealHandler} />
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
    switch (this.props.viewState) {
      case ViewState.Front:
        return this.renderFrontActions()
      case ViewState.Back:
        return this.renderBackActions()
    }
  }
}
