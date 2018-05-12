import * as React from 'react'
import styled from 'styled-components'
import { theme } from 'src/ui/components'

interface ButtonProps {
  label: string
  onClickHandler?: () => void
}

const StyledButton = styled.span`
  padding: 15px;
  color: ${theme.colors.light};
  background-color: ${theme.colors.dark};
`

export const Button: React.SFC<ButtonProps> = ({ label, onClickHandler }) => {
  return <StyledButton onClick={onClickHandler}>{label}</StyledButton>
}
