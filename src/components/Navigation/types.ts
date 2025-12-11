export interface NavigationProps {
  activePage: 'season' | 'performance';
  onPageChange: (page: 'season' | 'performance') => void;
}
