import * as React from 'react'
import { Card } from '../data/Card'
import { CardRenderer, ViewStates } from '../cards/CardRenderer'

export interface IReviewProps {
  card?: Card
}

export class Review extends React.Component<IReviewProps, object> {
  render() {
    if (!this.props.card) {
      return <>Nothing to review.</>
    }

    return <CardRenderer card={this.props.card} viewState={ViewStates.Front} />
  }
}
