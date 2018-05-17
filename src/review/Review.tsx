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

export const Review: React.SFC<ReviewProps> = ({ card, viewState, handleReveal, handleGrade }) => {
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

Review.defaultProps = {
  viewState: ViewState.Front,
}
