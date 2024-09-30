import ThemeConfig from "#src/theme";
import { RouterProvider } from "react-router-dom";
import router from "#src/routers/index";

export default function App() {
  return (
    <ThemeConfig>
      <RouterProvider router={router} />
    </ThemeConfig>
  );
}
