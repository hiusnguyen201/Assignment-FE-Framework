import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "#src/components/layouts/AuthLayout.tsx";
import MainLayout from "#src/components/layouts/MainLayout.tsx";
import HomePage from "#src/pages/client/HomePage.tsx";
import LoginPage from "#src/pages/auth/LoginPage.tsx";
import RegisterPage from "#src/pages/auth/RegisterPage.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);

export default router;
