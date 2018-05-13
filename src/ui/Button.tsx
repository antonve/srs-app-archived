import * as React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { theme } from 'src/ui/components'

interface ButtonProps {
  label: string
  onClickHandler?: () => void
}

const StyledButton = styled.button`
  font-size: 1em;
  padding: 15px;
  color: ${theme.colors.light};
  background-color: ${theme.colors.dark};
  border-radius: 3px;
  box-shadow: 0 3px 5px 0 ${rgba(theme.colors.darker, 0.05)};
  border: none;
  transition: all 0.2s ease-out;

  &:hover,
  &:focus {
    outline: none;
    cursor: pointer;
    color: ${theme.colors.lighter};
    box-shadow: 0 4px 7px 0 ${rgba(theme.colors.darker, 0.15)};
  }

  &:active {
    outline: none;
    box-shadow: inset 0 3px 5px 0 ${rgba(theme.colors.darker, 0.05)};
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
`

export const Button: React.SFC<ButtonProps> = ({ label, onClickHandler }) => {
  return <StyledButton onClick={onClickHandler}>{label}</StyledButton>
}
