import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    background: ${({ theme }) => theme.colors.background.main};
    background-image:
      radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%),
      radial-gradient(at 97% 21%, hsla(189, 95%, 66%, 0.15) 0px, transparent 50%),
      radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.15) 0px, transparent 50%),
      radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.15) 0px, transparent 50%),
      radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.15) 0px, transparent 50%),
      radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.15) 0px, transparent 50%),
      radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.15) 0px, transparent 50%);
    background-attachment: fixed;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100vh;
    contain: paint;
    transition: background ${({ theme }) => theme.transitions.medium},
                color ${({ theme }) => theme.transitions.medium};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: 1.2;
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  html {
    overflow-y: scroll;
    scrollbar-gutter: stable;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.card};
  }

  ::-webkit-scrollbar-thumb {
    background: #7B61C9;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #D44FA1;
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.colors.background.card};
  }
`;
