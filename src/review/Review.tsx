import * as React from 'react'
import { Card } from '../data/Card'
import { CardRenderer, ViewStates } from '../cards/CardRenderer'
import { ActionBar } from './ActionBar'

export interface ReviewState {
  viewState: ViewStates
  time: number
}

export interface ReviewProps {
  card?: Card
  reviewState?: ReviewState
}

export class Review extends React.Component<ReviewProps, object> {
  render() {
    if (!this.props.card) {
      return <>Nothing to review.</>
    }

    return (
      <>
        <CardRenderer card={this.props.card} viewState={this.props.reviewState.viewState} />
        <ActionBar reviewState={this.props.reviewState} />
      </>
    )
  }
}
