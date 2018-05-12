import * as React from 'react'
import { Card } from '../data/Card'

export enum ViewStates {
  Front = 'FRONT',
  Back = 'BACK',
}

interface CardRendererProps {
  card: Card
  viewState: ViewStates
}

export class CardRenderer extends React.Component<CardRendererProps, object> {
  render() {
    switch (this.props.viewState) {
      case ViewStates.Front:
        return this.props.card.fields.front
      case ViewStates.Back:
        return this.props.card.fields.back
    }
  }
}
