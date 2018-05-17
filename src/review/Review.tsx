import * as React from 'react'
import { Card, ViewState, Grade } from 'src/model/interfaces'
import { CardRenderer } from 'src/cards/CardRenderer'
import { ActionBar } from 'src/review/ActionBar'

export interface ReviewProps {
  card?: Card
  viewState?: ViewState
  handleReveal: () => void
  handleGrade: (grade: Grade) => void
}

export class Review extends React.Component<ReviewProps, {}> {
  public static defaultProps: Partial<ReviewProps> = {
    viewState: ViewState.Front,
  }

  render() {
    const { card, viewState, handleReveal, handleGrade } = this.props

    if (!card) {
      return <>Nothing to review.</>
    }

    return (
      <>
        <CardRenderer card={card} viewState={viewState} />
        <ActionBar viewState={viewState} handleReveal={handleReveal} handleGrade={handleGrade} />
      </>
    )
  }
}
