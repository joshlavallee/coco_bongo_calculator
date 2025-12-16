import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  ${({ theme }) => css`
    width: 24px;
    height: 24px;
    border: 3px solid ${theme.colors.border.light};
    border-top-color: ${theme.colors.accent};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  `}
`;
