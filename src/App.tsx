import * as React from 'react'
import { theme, Button } from 'src/ui/components'
import styled from 'styled-components'

const StyledApp = styled.div`
  font-family: ${theme.fonts.body};
`

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <StyledApp>
        <Button label={'Hey there from App!'} />
      </StyledApp>
    )
  }
}
