import { ReactNode } from 'react'
import { ViewState } from 'src/model'

export interface Card {
  deckID: number
  cardTypeID: number
  fields: { [K in ViewState]: ReactNode }
  tags: string[]
}
