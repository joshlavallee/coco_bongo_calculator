import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  backdrop-filter: blur(${({ theme }) => theme.blur.lg});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.lg});
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.medium};
  }
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.glass};
  backdrop-filter: blur(${({ theme }) => theme.blur.md});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.md});
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.border.medium};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const StatIcon = styled.div<{ success?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, success }) =>
    success ? `${theme.colors.success}22` : `${theme.colors.accent}22`};
  color: ${({ theme, success }) =>
    success ? theme.colors.success : theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const StatValue = styled.div<{ success?: boolean; profit?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, success, profit }) => {
    if (profit !== undefined) {
      return profit ? theme.colors.success : theme.colors.error;
    }
    return success ? theme.colors.success : theme.colors.text.primary;
  }};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const StatDetail = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const InfoNote = styled.div`
  background: ${({ theme }) => theme.colors.secondary}22;
  backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  border-left: 3px solid ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-left: 3px solid ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const NoteTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const NoteText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;

  code {
    background: ${({ theme }) => theme.colors.background.main};
    padding: 2px 6px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.colors.accent};
  }
`;
