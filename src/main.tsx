import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import GlobalStyles from "#src/components/GlobalStyles";

createRoot(document.getElementById("root")!).render(
  <GlobalStyles>
    <App />
  </GlobalStyles>
);
