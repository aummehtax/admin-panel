import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import MainLayout from "./components/MainLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Logout from "./components/Logout";
import ResetPassword from "./components/ResetPassword";
import Unauthorized from "./components/Unauthorized";
import { Toaster } from "./components/ui/sonner";
import { UserProvider } from "./contexts/UserContext";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/logout",
    element: <Logout />,
  },

  {
    element: <ProtectedRoutes requiredRole={["admin", "moderator"]} />,

    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

const App = () => {
  return (
    <UserProvider>
      <Toaster
        position="top-right"
        richColors
        duration={4000}
        closeButton
        expand={false}
      />
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
