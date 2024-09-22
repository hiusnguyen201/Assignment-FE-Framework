import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "#src/components/layouts/AuthLayout";
import MainLayout from "#src/components/layouts/MainLayout";
import { LoginPage, RegisterPage } from "#src/pages/auth";
import { HomePage, PatientsPage } from "#src/pages/client";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/patients", element: <PatientsPage /> },
    ],
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
