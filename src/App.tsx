import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Navigation, ThemeToggle } from "./components";
import { SeasonPage } from "./pages/SeasonPage";
import { PerformancePage } from "./pages/PerformancePage";

const CURRENT_SEASON = 2025;

const App = () => {
  const [activePage, setActivePage] = useState<"season" | "performance">(
    "season"
  );
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles theme={isDarkMode ? darkTheme : lightTheme} />
      <AppContainer>
        <Header>
          <HeaderContent>
            <Logo>
              <PeachIcon>🍑</PeachIcon>
              <LogoText>Coco Bongo Calculator</LogoText>
            </Logo>
            <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
          </HeaderContent>
        </Header>

        <MainContent>
          <Navigation activePage={activePage} onPageChange={setActivePage} />

          {activePage === "season" && <SeasonPage season={CURRENT_SEASON} />}
          {activePage === "performance" && (
            <PerformancePage season={CURRENT_SEASON} />
          )}
        </MainContent>

        <Footer>
          <FooterText>
            Built for 2025 NFL Season · Data updates every 5 minutes
          </FooterText>
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: ${({ theme }) => theme.colors.background.card};
  backdrop-filter: blur(${({ theme }) => theme.blur.xl});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.xl});
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all ${({ theme }) => theme.transitions.fast};
`;

const HeaderContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accent};
`;

const PeachIcon = styled.div`
  font-size: 32px;
  line-height: 1;
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1.3;
  padding-bottom: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 6s linear infinite;

  @keyframes gradientShift {
    0% {
      background-position: 0% center;
    }
    100% {
      background-position: 200% center;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.background.card};
  backdrop-filter: blur(${({ theme }) => theme.blur.xl});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.xl});
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const FooterText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;
