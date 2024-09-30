import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ThemeMode } from "#src/constants";

type ThemeContextType = {
  themeMode: string;
  setThemeMode: Dispatch<SetStateAction<string>>;
  isDark: Boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  themeMode: ThemeMode.LIGHT,
  setThemeMode: () => {},
  isDark: false,
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || ThemeMode.LIGHT
  );

  const values = {
    themeMode,
    setThemeMode,
    isDark: themeMode === ThemeMode.DARK,
  };

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
