import * as React from 'react'
import { Card, ViewState, Grade } from 'src/model/interfaces'
import { Review } from 'src/review/Review'
import * as DB from 'src/Database'

export interface ReviewState {
  viewState: ViewState
  time: number
}

interface State {
  card?: Card
  reviewState?: ReviewState
}

export class ReviewContainer extends React.Component<{}, {}> {
  componentDidMount() {
    DB.get().then(db => {
      db.collections.cards.findOne().$.subscribe((card: DB.CardSchema) => this.setState({ card }))
    })
  }

  state: State = {
    reviewState: {
      viewState: ViewState.Front,
      time: 0,
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

    return <Review card={card} viewState={reviewState.viewState} handleReveal={this.reveal} handleGrade={this.grade} />
  }
}
