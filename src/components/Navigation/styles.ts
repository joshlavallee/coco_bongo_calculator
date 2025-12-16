import styled, { css } from "styled-components";

export const NavContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.sm};
    background: ${theme.colors.background.card};
    backdrop-filter: blur(${theme.blur.lg});
    -webkit-backdrop-filter: blur(${theme.blur.lg});
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.glass};
    padding: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.xl};
    transition: all ${theme.transitions.fast};

    &:hover {
      border-color: ${theme.colors.border.medium};
    }
  `}
`;

export const NavButton = styled.button<{ $active: boolean }>`
  ${({ theme, $active }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.md};
    background: ${$active ? theme.colors.accent : "transparent"};
    color: ${$active
      ? theme.colors.background.main
      : theme.colors.text.primary};
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.semibold};
    transition: all ${theme.transitions.fast};
    flex: 1;
    justify-content: center;

    &:hover {
      background: ${$active ? theme.colors.accent : `${theme.colors.accent}22`};
    }
  `}
`;
