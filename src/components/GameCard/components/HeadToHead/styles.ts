import styled, { css } from "styled-components";

export const HeadToHeadSection = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      135deg,
      ${theme.colors.primary}20 0%,
      ${theme.colors.secondary}20 100%
    );
    backdrop-filter: blur(${theme.blur.md});
    -webkit-backdrop-filter: blur(${theme.blur.md});
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.lg};
    border: 1px solid ${theme.colors.border.accent};
    box-shadow: ${theme.shadows.glow};
    transition: all ${theme.transitions.fast};
    margin-bottom: ${theme.spacing.lg};

    &:hover {
      box-shadow: ${theme.shadows.glow}, ${theme.shadows.md};
    }
  `}
`;

export const HeadToHeadTitle = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.sm};
  `}
`;

export const TDScorersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TDScorerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TDScorerName = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.fontWeight.semibold};
    font-size: ${theme.typography.fontSize.sm};
  `}
`;

export const TDScorerCount = styled.div<{ $tdCount: number }>`
  ${({ theme, $tdCount }) => css`
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${$tdCount === 0
      ? "#FF555522"
      : $tdCount === 1
      ? "#FFB86C22"
      : $tdCount >= 3
      ? "#50FA7B22"
      : theme.colors.accent + "22"};
    color: ${$tdCount === 0
      ? "#FF5555"
      : $tdCount === 1
      ? "#FFB86C"
      : $tdCount >= 3
      ? "#50FA7B"
      : theme.colors.accent};
    border: 1px solid
      ${$tdCount === 0
        ? "#FF555544"
        : $tdCount === 1
        ? "#FFB86C44"
        : $tdCount >= 3
        ? "#50FA7B44"
        : theme.colors.accent + "44"};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.bold};
    font-family: ${theme.typography.fontFamily.mono};
    transition: all ${theme.transitions.fast};

    &:hover {
      transform: scale(1.1);
      box-shadow: ${theme.shadows.sm};
    }
  `}
`;
