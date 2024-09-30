import ThemeConfig from "#src/theme";
import { ThemeProvider } from "#src/contexts/ThemeContext";
import { RouterProvider } from "react-router-dom";
import router from "#src/routers/index";

export default function App() {
  return (
    <ThemeProvider>
      <ThemeConfig>
        <RouterProvider router={router} />
      </ThemeConfig>
    </ThemeProvider>
  );
}
