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

export const WeekGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  justify-content: flex-start;
`;

export const WeekPill = styled.button<{ selected: boolean; isCurrent: boolean }>`
  position: relative;
  background: ${({ theme, selected, isCurrent }) => {
    if (selected) return theme.colors.accent;
    if (isCurrent) return `${theme.colors.accent}33`;
    return theme.colors.background.glass;
  }};
  backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  border: 2px solid
    ${({ theme, selected, isCurrent }) => {
      if (selected) return theme.colors.accent;
      if (isCurrent) return theme.colors.accent;
      return theme.colors.border.light;
    }};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.background.main : theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 65px;
  width: calc((100% - (17 * ${({ theme }) => theme.spacing.xs})) / 18);
  min-width: 60px;
  transform: ${({ selected }) => selected ? 'scale(1.08)' : 'scale(1)'};

  &:hover {
    transform: scale(1.08);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme, selected }) =>
      selected ? theme.colors.accent : `${theme.colors.accent}22`};
  }

  &:active {
    transform: scale(1.05);
  }
`;

export const WeekNumber = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const AssignedName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-top: 2px;
  opacity: 0.9;
  line-height: 1.2;
  text-align: center;
`;
