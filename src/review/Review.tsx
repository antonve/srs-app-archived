import * as React from 'react'
import { Card, ViewState, Grade } from 'src/model/interfaces'
import { CardRenderer } from 'src/cards/CardRenderer'
import { ActionBar } from 'src/review/ActionBar'

export interface ReviewProps {
  card?: Card
  viewState?: ViewState
  revealHandler?: () => void
  gradeHandler?: (grade: Grade) => void
}

export class Review extends React.Component<ReviewProps, {}> {
  public static defaultProps: Partial<ReviewProps> = {
    viewState: ViewState.Front,
  }

  render() {
    const { card, viewState, revealHandler, gradeHandler } = this.props

    if (!card) {
      return <>Nothing to review.</>
    }

    return (
      <>
        <CardRenderer card={card} viewState={viewState} />
        <ActionBar viewState={viewState} revealHandler={revealHandler} gradeHandler={gradeHandler} />
      </>
    )
  }
}
