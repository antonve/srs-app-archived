import * as React from 'react'
import { ViewState, Grade } from 'src/model/interfaces'
import { Button } from 'src/ui/components'

export interface ActionBarProps {
  viewState: ViewState
  handleReveal: () => void
  handleGrade: (grade: Grade) => void
}

export class ActionBar extends React.Component<ActionBarProps, {}> {
  renderFrontActions = () => {
    return <Button label="Reveal card" onClick={this.props.handleReveal} />
  }

  renderBackActions = () => {
    const { handleGrade } = this.props

    return (
      <>
        <Button label="Wrong" onClick={() => handleGrade(Grade.Wrong)} />
        <Button label="Correct" onClick={() => handleGrade(Grade.Correct)} />
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
