import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.card};
    backdrop-filter: blur(${theme.blur.lg});
    -webkit-backdrop-filter: blur(${theme.blur.lg});
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.glass};
    padding: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.xl};
    transition: all ${theme.transitions.fast};

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

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StatCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.glass};
    backdrop-filter: blur(${theme.blur.md});
    -webkit-backdrop-filter: blur(${theme.blur.md});
    border: 1px solid ${theme.colors.border.light};
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.lg};
    text-align: center;
    transition: all ${theme.transitions.fast};

    &:hover {
      transform: translateY(-4px);
      border-color: ${theme.colors.border.medium};
      box-shadow: ${theme.shadows.md};
    }
  `}
`;

export const StatIcon = styled.div<{ success?: boolean }>`
  ${({ theme, success }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: ${theme.borderRadius.md};
    background: ${success
      ? `${theme.colors.success}22`
      : `${theme.colors.accent}22`};
    color: ${success ? theme.colors.success : theme.colors.accent};
    margin-bottom: ${theme.spacing.sm};
  `}
`;

export const StatValue = styled.div<{ success?: boolean; profit?: boolean }>`
  ${({ theme, success, profit }) => css`
    font-size: ${theme.typography.fontSize.xxl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${profit !== undefined
      ? profit
        ? theme.colors.success
        : theme.colors.error
      : success
      ? theme.colors.success
      : theme.colors.text.primary};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

export const StatLabel = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${theme.spacing.xs};
    font-weight: ${theme.typography.fontWeight.medium};
  `}
`;

export const StatDetail = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const InfoNote = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondary}22;
    backdrop-filter: blur(${theme.blur.sm});
    -webkit-backdrop-filter: blur(${theme.blur.sm});
    border-left: 3px solid ${theme.colors.accent};
    border: 1px solid ${theme.colors.border.light};
    border-left: 3px solid ${theme.colors.accent};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.lg};
  `}
`;

export const NoteTitle = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.accent};
    margin-bottom: ${theme.spacing.xs};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `}
`;

export const NoteText = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    line-height: 1.6;

    code {
      background: ${theme.colors.background.main};
      padding: 2px 6px;
      border-radius: ${theme.borderRadius.sm};
      font-family: ${theme.typography.fontFamily.mono};
      font-size: ${theme.typography.fontSize.xs};
      color: ${theme.colors.accent};
    }
  `}
`;
