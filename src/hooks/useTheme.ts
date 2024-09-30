import { useContext } from "react";
import { ThemeContext } from "#src/contexts/ThemeContext";

const useTheme = () => useContext(ThemeContext);

export default useTheme;
