import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import store from "./redux/store";
import ThemeConfig from "#src/theme";
import { ThemeProvider } from "#src/contexts/ThemeContext";
import router from "#src/routers/index";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <ThemeConfig>
          <RouterProvider router={router} />
        </ThemeConfig>
      </ThemeProvider>
    </ReduxProvider>
  );
}
