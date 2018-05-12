import * as React from 'react'
import { theme, Button } from 'src/ui/components'
import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    margin: 0;
  }
`

const StyledApp = styled.div`
  font-family: ${theme.fonts.body};
  background-color: ${theme.colors.dark};
  width: 100vw;
  height: 100vh;
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
