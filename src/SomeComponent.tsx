import * as React from "react"

export interface SomeComponentProps {
  message?: string
}

interface SomeComponentStates {
  count: number
}

/**
 * Extends React.Component<P, S>, where P are props, S are states.
 */
export class SomeComponent extends React.Component<SomeComponentProps, SomeComponentStates> {
  state = {
    count: 0,
  }

  countInterval: any = null

  componentDidMount() {
    // Sorry, I had to cast this.countInterval as any due to type conflict with node types. It sucks.
    this.countInterval = setInterval(
      () =>
        this.setState({
          count: this.state.count + 1,
        }),
      1000,
    )
  }

  componentWillUnmount() {
    clearInterval(this.countInterval)
  }

  render() {
    return (
      <>
        <p>This is SomeComponent, and it's displaying {this.props.message || "propMessageNotFound"}</p>
        <p>The current timer value is: {this.state.count}</p>
      </>
    )
  }
}
