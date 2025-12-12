import { Sun, Moon } from "lucide-react";
import { ThemeToggleProps } from "./types";
import { TOGGLE_THEME_ARIA_LABEL } from "./constants";
import { ToggleButton } from "./styles";

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
}) => {
  return (
    <ToggleButton onClick={onToggle} aria-label={TOGGLE_THEME_ARIA_LABEL}>
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </ToggleButton>
  );
};
