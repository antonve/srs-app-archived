import * as React from 'react'

export class Review extends React.Component<object, object> {
  render() {
    if (!this.props.card) {
      return <>Nothing to review.</>
    }

    return <>Card.</>
  }
}
