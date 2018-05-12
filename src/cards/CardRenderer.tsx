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

export const CardRenderer: React.SFC<CardRendererProps> = ({ card, viewState }) => {
  return card.fields[viewState]
}
