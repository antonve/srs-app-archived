import * as React from 'react'
import { Card } from '../data/Card'
import { CardRenderer, ViewState } from '../cards/CardRenderer'
import { ActionBar } from './ActionBar'

export interface ReviewState {
  viewState: ViewState
  time: number
}

export interface ReviewProps {
  card?: Card
  reviewState?: ReviewState
}

export class Review extends React.Component<ReviewProps, {}> {
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
