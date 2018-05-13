import * as React from 'react'
import { Card, ViewState } from 'src/model/interfaces'

interface CardRendererProps {
  card: Card
  viewState: ViewState
}

export const CardRenderer: React.SFC<CardRendererProps> = ({ card, viewState }) => {
  return <>{card.fields[viewState]}</>
}
