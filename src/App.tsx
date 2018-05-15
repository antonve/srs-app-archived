import * as React from 'react'
import { SomeComponent } from './SomeComponent'
import { DatabaseExample } from './DatabaseExample'

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <SomeComponent message={'Hey there from App!'} />
        <DatabaseExample />
      </div>
    )
  }
}
