import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.glass};
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.xl};
    padding: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.xl};
    transition: background ${theme.transitions.fast},
      border-color ${theme.transitions.fast};

    &:hover {
      border-color: ${theme.colors.border.medium};
    }
  `}
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xxl};
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.text.primary};
  `}
`;

export const Subtitle = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
  `}
`;

export const WeekGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: flex-start;
`;

export const WeekPill = styled.button<{
  selected: boolean;
  isCurrent: boolean;
}>`
  ${({ theme, selected, isCurrent }) => css`
    position: relative;
    background: ${selected
      ? theme.colors.accent
      : isCurrent
      ? `${theme.colors.accent}33`
      : theme.colors.background.glass};
    backdrop-filter: blur(${theme.blur.sm});
    -webkit-backdrop-filter: blur(${theme.blur.sm});
    border: 2px solid
      ${selected
        ? theme.colors.accent
        : isCurrent
        ? theme.colors.accent
        : theme.colors.border.light};
    color: ${selected
      ? theme.colors.background.main
      : theme.colors.text.primary};
    padding: ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.lg};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    cursor: pointer;
    transition: all ${theme.transitions.fast};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 65px;
    flex: 1;
    min-width: 55px;
    transform: ${selected ? "scale(1.08)" : "scale(1)"};
    margin-left: ${selected ? theme.spacing.sm : "0"};
    margin-right: ${selected ? theme.spacing.sm : "0"};

    &:hover {
      transform: scale(1.08);
      box-shadow: ${theme.shadows.md};
      border-color: ${theme.colors.accent};
      background: ${selected
        ? theme.colors.accent
        : `${theme.colors.accent}22`};
    }

    &:active {
      transform: scale(1.05);
    }
  `}
`;

export const WeekNumber = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.bold};
  `}
`;

export const AssignedName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-top: 2px;
  opacity: 0.9;
  line-height: 1.2;
  text-align: center;
`;
