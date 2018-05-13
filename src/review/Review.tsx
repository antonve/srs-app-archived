import * as React from 'react'
import { Card, ViewState } from 'src/model/interfaces'
import { CardRenderer } from 'src/cards/CardRenderer'
import { ActionBar } from 'src/review/ActionBar'

export interface ReviewState {
  viewState: ViewState
  time: number
}

export interface ReviewProps {
  card?: Card
  reviewState?: ReviewState
}

export class Review extends React.Component<ReviewProps, {}> {
  public static defaultProps: Partial<ReviewProps> = {
    reviewState: {
      viewState: ViewState.Front,
      time: 0,
    },
  }

  render() {
    const { card, reviewState } = this.props

    if (!card) {
      return <>Nothing to review.</>
    }

    return (
      <>
        <CardRenderer card={card} viewState={reviewState.viewState} />
        <ActionBar reviewState={reviewState} />
      </>
    )
  }
}
