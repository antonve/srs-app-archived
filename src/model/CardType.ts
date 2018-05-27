import { ReactNode } from 'react'

export interface CardField {
  ID: string
  name: string
}

export interface CardType {
  ID: string
  name: string
  fields: CardField[]
  templates: string[]
}
