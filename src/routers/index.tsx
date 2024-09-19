import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "#src/layouts/AuthLayout";
import MainLayout from "#src/layouts/MainLayout";
import HomePage from "#src/pages/client/HomePage";
import LoginPage from "#src/pages/auth/LoginPage";
import RegisterPage from "#src/pages/auth/RegisterPage";

export default createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);
