import { useContext } from "react";
import { ThemeContext } from "#src/contexts/ThemeContext";

const useSettings = () => useContext(ThemeContext);

export default useSettings;
