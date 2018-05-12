import * as React from 'react'
import { Card } from '../data/Card'

export enum ViewState {
  Front = 'front',
  Back = 'back',
}

interface CardRendererProps {
  card: Card
  viewState: ViewState
}

export class CardRenderer extends React.Component<CardRendererProps, object> {
  render() {
    const { card, viewState } = this.props

    return card.fields[viewState]
  }
}
