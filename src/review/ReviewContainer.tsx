import * as React from 'react'
import { Card, ViewState, Grade } from 'src/model/interfaces'
import { Review } from 'src/review/Review'

export interface ReviewState {
  viewState: ViewState
  time: number
}

interface State {
  card?: Card
  reviewState?: ReviewState
}

export class ReviewContainer extends React.Component<{}, {}> {
  state: State = {
    reviewState: {
      viewState: ViewState.Front,
      time: 0,
    },
    card: {
      deckID: 1,
      cardTypeID: 1,
      fields: {
        front: 'こんにちは',
        back: 'Hello',
      },
      tags: [] as string[],
    },
  }

  reveal = () => {
    this.setState({
      ...this.state,
      reviewState: {
        ...this.state.reviewState,
        viewState: ViewState.Back,
      },
    })
  }

  grade = (grade: Grade) => {
    this.setState({
      card: null,
      reviewState: {
        viewState: ViewState.Front,
        time: 0,
      },
    })
  }

  render() {
    const { card, reviewState } = this.state

    return (
      <Review card={card} viewState={reviewState.viewState} revealHandler={this.reveal} gradeHandler={this.grade} />
    )
  }
}
