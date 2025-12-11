const draculaDark = {
  colors: {
    primary: '#BD93F9',
    secondary: '#FF79C6',
    accent: '#8BE9FD',
    success: '#50FA7B',
    warning: '#FFB86C',
    error: '#FF5555',

    background: {
      main: '#1a1b26',
      card: 'rgba(68, 71, 90, 0.4)',
      hover: 'rgba(98, 114, 164, 0.3)',
      glass: 'rgba(40, 42, 54, 0.6)',
    },

    text: {
      primary: '#F8F8F2',
      secondary: '#F8F8F2',
      muted: '#6272A4',
    },

    border: {
      light: 'rgba(139, 233, 253, 0.1)',
      medium: 'rgba(139, 233, 253, 0.2)',
      accent: 'rgba(139, 233, 253, 0.4)',
    },
  },
};

const draculaLight = {
  colors: {
    primary: '#7B61C9',
    secondary: '#D44FA1',
    accent: '#4DB8CC',
    success: '#2FB35C',
    warning: '#D99A4E',
    error: '#D93838',

    background: {
      main: '#e0f2fe',
      card: 'rgba(255, 255, 255, 0.4)',
      hover: 'rgba(230, 230, 230, 0.5)',
      glass: 'rgba(255, 255, 255, 0.6)',
    },

    text: {
      primary: '#282A36',
      secondary: '#44475A',
      muted: '#6272A4',
    },

    border: {
      light: 'rgba(77, 184, 204, 0.15)',
      medium: 'rgba(77, 184, 204, 0.25)',
      accent: 'rgba(77, 184, 204, 0.5)',
    },
  },
};

const baseTheme = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
  },

  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 16px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.15)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.2)',
    glow: '0 0 20px rgba(139, 233, 253, 0.3)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },

  blur: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  transitions: {
    fast: '150ms ease-in-out',
    medium: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },

  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'Courier New', monospace",
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '32px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

export const darkTheme = { ...baseTheme, ...draculaDark };
export const lightTheme = { ...baseTheme, ...draculaLight };

export type Theme = typeof darkTheme;
