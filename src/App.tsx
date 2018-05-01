import * as React from 'react'
import { SomeComponent } from './SomeComponent'

export class App extends React.Component<{}, {}> {
  render() {
    return <SomeComponent message={'Hey there from App!'} />
  }
}
