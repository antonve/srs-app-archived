import * as React from 'react'
import { Card } from 'data/Card'

export interface IReviewProps {
  card: Card | null
}

export class Review extends React.Component<object, object> {
  constructor(props: IReviewProps) {
    super(props)
  }

  render() {
    if (!this.props.card) {
      return <>Nothing to review.</>
    }

    return <>Card.</>
  }
}
