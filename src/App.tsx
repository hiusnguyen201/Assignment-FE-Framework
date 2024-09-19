import { RouterProvider } from "react-router-dom";
import router from "#src/routers/index";

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
