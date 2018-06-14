import * as React from 'react'
import { Card, ViewState } from 'src/model'

interface CardRendererProps {
  card: Card
  viewState: ViewState
}

export const CardRenderer: React.SFC<CardRendererProps> = ({ card, viewState }) => {
  let template: string = card.cardType.template[viewState]

  if (template === null) {
    return null
  }

  const replacer = (_: string, fieldName: string) => {
    const field = card.cardType.fields.find(field => field.name === fieldName)

    if (field === null) {
      return `{{${fieldName}: field not found}}`
    }

    return card.fields[field.ID].value
  }

  const output = template.replace(/{{(.*?)}}/g, replacer)

  return <>output</>
}
