import * as React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { theme } from 'src/ui/components'

interface ButtonProps {
  label: string
  onClickHandler?: () => void
}

const StyledButton = styled.button`
  padding: 15px;
  color: ${theme.colors.light};
  background-color: ${theme.colors.dark};

  &:hover {
    cursor: pointer;
    background-color: ${rgba(theme.colors.dark, 0.7)};
  }
`

export const Button: React.SFC<ButtonProps> = ({ label, onClickHandler }) => {
  return <StyledButton onClick={onClickHandler}>{label}</StyledButton>
}
