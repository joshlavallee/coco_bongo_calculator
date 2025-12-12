import styled, { css } from "styled-components";

export const ToggleButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${theme.borderRadius.lg};
    background: ${theme.colors.background.glass};
    backdrop-filter: blur(${theme.blur.md});
    -webkit-backdrop-filter: blur(${theme.blur.md});
    border: 1px solid ${theme.colors.border.light};
    color: ${theme.colors.text.primary};
    box-shadow: ${theme.shadows.sm};
    transition: all ${theme.transitions.fast};
    cursor: pointer;

    &:hover {
      background: ${theme.colors.accent};
      border-color: ${theme.colors.accent};
      color: ${theme.colors.background.main};
      transform: scale(1.05);
      box-shadow: ${theme.shadows.md};
    }

    &:active {
      transform: scale(0.95);
    }
  `}
`;
