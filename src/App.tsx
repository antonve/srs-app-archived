import * as React from 'react'
import { Button } from 'src/ui/components'

export class App extends React.Component<{}, {}> {
  render() {
    return <Button label={'Hey there from App!'} />
  }
}
