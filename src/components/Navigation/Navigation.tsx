import { Calendar, BarChart3 } from 'lucide-react';
import { NavigationProps } from './types';
import { SEASON_TAB_LABEL, PERFORMANCE_TAB_LABEL } from './constants';
import * as S from './styles';

export const Navigation: React.FC<NavigationProps> = ({ activePage, onPageChange }) => {
  return (
    <S.NavContainer>
      <S.NavButton
        active={activePage === 'season'}
        onClick={() => onPageChange('season')}
      >
        <Calendar size={20} />
        <span>{SEASON_TAB_LABEL}</span>
      </S.NavButton>
      <S.NavButton
        active={activePage === 'performance'}
        onClick={() => onPageChange('performance')}
      >
        <BarChart3 size={20} />
        <span>{PERFORMANCE_TAB_LABEL}</span>
      </S.NavButton>
    </S.NavContainer>
  );
};
