import * as React from 'react'
import styled from 'styled-components'
import { ColorPalette } from 'ui/components'

interface ButtonProps {
  label: string
  onClickHandler?: () => void
}

const StyledButton = styled.span`
  padding: 15px;
  color: ${ColorPalette.light};
  background-color: ${ColorPalette.dark};
`

export const Button: React.SFC<ButtonProps> = ({ label, onClickHandler }) => {
  return <StyledButton onClick={onClickHandler}>{label}</StyledButton>
}
