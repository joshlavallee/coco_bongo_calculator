import styled, { css } from "styled-components";

export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitleRow = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
`;

export const CurrentBadge = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.accent};
    color: ${theme.colors.background.main};
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `}
`;

export const SectionSubtitle = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.md};
    color: ${theme.colors.text.secondary};
  `}
`;

export const LoadingContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.xxl};
  `}
`;

export const LoadingSpinner = styled.div`
  ${({ theme }) => css`
    width: 48px;
    height: 48px;
    border: 4px solid ${theme.colors.border.light};
    border-top-color: ${theme.colors.accent};
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;

export const LoadingText = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.md};
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.md};
  `}
`;

export const ErrorContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.error}22;
    border: 1px solid ${theme.colors.error};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.lg};
    text-align: center;
  `}
`;

export const ErrorText = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.error};
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.medium};
  `}
`;

export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyState = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.xxl};
    background: ${theme.colors.background.card};
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.lg};
    text-align: center;
  `}
`;

export const EmptyText = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.sm};
  `}
`;

export const EmptySubtext = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
  `}
`;
