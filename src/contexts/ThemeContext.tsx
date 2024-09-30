import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ThemeMode } from "#src/constants";

type ThemeContextType = {
  themeMode: string;
  setThemeMode: Dispatch<SetStateAction<string>>;
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: ThemeMode.LIGHT,
  setThemeMode: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || ThemeMode.LIGHT
  );

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const isDark = themeMode === ThemeMode.DARK;

  const value = {
    themeMode,
    setThemeMode,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
