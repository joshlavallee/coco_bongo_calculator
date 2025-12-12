import styled, { css } from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const HeaderLeft = styled.div``;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const Subtitle = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.md};
    color: ${theme.colors.text.secondary};
  `}
`;

export const AddButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    background: ${theme.colors.accent};
    color: ${theme.colors.background.main};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.semibold};
    transition: all ${theme.transitions.fast};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }
  `}
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
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

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const StatCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.card};
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.lg};
    text-align: center;
  `}
`;

export const StatLabel = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.sm};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `}
`;

export const StatValue = styled.div<{ success?: boolean }>`
  ${({ theme, success }) => css`
    font-size: ${theme.typography.fontSize.xxxl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${success !== undefined
      ? success
        ? theme.colors.success
        : theme.colors.text.primary
      : theme.colors.text.primary};
  `}
`;

export const AnalyticsSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PositionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PositionCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.card};
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.lg};
  `}
`;

export const PositionHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.md};
    padding-bottom: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border.light};
  `}
`;

export const PositionName = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.accent};
  `}
`;

export const WinRate = styled.div<{ success: boolean }>`
  ${({ theme, success }) => css`
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${success ? theme.colors.success : theme.colors.error};
  `}
`;

export const PositionStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const StatRowLabel = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.text.secondary};
  `}
`;

export const StatRowValue = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
  `}
`;

export const DefenseRankGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const DefenseRankCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.card};
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.lg};
  `}
`;

export const DefenseRankLabel = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

export const DefenseRankWinRate = styled.div<{ success: boolean }>`
  ${({ theme, success }) => css`
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${success ? theme.colors.success : theme.colors.error};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

export const DefenseRankDetails = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.sm};
  `}
`;

export const ProgressBar = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 8px;
    background: ${theme.colors.background.main};
    border-radius: ${theme.borderRadius.sm};
    overflow: hidden;
  `}
`;

export const ProgressFill = styled.div<{ width: number; success: boolean }>`
  ${({ theme, width, success }) => css`
    height: 100%;
    width: ${width * 100}%;
    background: ${success ? theme.colors.success : theme.colors.error};
    transition: width ${theme.transitions.medium};
  `}
`;

export const TicketsSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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

export const TicketsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TicketCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.card};
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.lg};
  `}
`;

export const TicketHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.md};
    padding-bottom: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border.light};
  `}
`;

export const TicketInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TicketWeek = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
  `}
`;

export const TicketResult = styled.div<{ result: string }>`
  ${({ theme, result }) => css`
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${result === "win"
      ? theme.colors.success
      : theme.colors.text.secondary};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    background: ${result === "win"
      ? `${theme.colors.success}22`
      : theme.colors.background.main};
    border-radius: ${theme.borderRadius.sm};
  `}
`;

export const TicketDate = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.muted};
  `}
`;

export const PicksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const PickItem = styled.div<{ scored: boolean }>`
  ${({ theme, scored }) => css`
    display: flex;
    gap: ${theme.spacing.sm};
    padding: ${theme.spacing.md};
    background: ${theme.colors.background.main};
    border: 1px solid
      ${scored ? theme.colors.success : theme.colors.border.light};
    border-radius: ${theme.borderRadius.md};
  `}
`;

export const PickIcon = styled.div`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PickDetails = styled.div`
  flex: 1;
`;

export const PickName = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

export const PickMeta = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.secondary};
    margin-bottom: 2px;
  `}
`;

export const PickDefense = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.muted};
  `}
`;

export const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const FormContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.card};
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.xl};
    max-width: 500px;
    width: 90%;
  `}
`;

export const FormTitle = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xxl};
    margin-bottom: ${theme.spacing.md};
  `}
`;

export const FormText = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.md};
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
    margin-bottom: ${theme.spacing.lg};
  `}
`;

export const FormButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.accent};
    color: ${theme.colors.background.main};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.semibold};
  `}
`;
