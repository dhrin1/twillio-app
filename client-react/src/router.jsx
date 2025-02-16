import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/auth/login";
import DefaultLayout from "./components/shared/layout/default-layout";
import GuestLayout from "./components/shared/layout/guest-layout";
import SignUp from "./pages/auth/sign-up";
import CheckpointPage from "./pages/auth/checkpoint";

import HomePage from "./pages/dashboard/home";
import VoicePage from "./pages/dashboard/voice";
import CustomerPage from "./pages/dashboard/customer";

import SettingsPage from "./pages/dashboard/setting";
import AnalyticsPage from "./pages/dashboard/analytics";
import VoiceActivePage from "./pages/dashboard/voice/active";
import VoiceHistoryPage from "./pages/dashboard/voice/history";
import NotFound from "./pages/error/not-found";

import SettingsUsersPage from "./pages/dashboard/setting/users";
import SettingsAccountsPage from "./pages/dashboard/setting/accounts";
import CustomerHomePage from "./pages/dashboard/customer/home";
import TestVoicePage from "./pages/dashboard/voice/test";
import SettingsProfilePage from "./pages/dashboard/setting/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Navigate to="/" /> },
      {
        path: "/",
        children: [
          { index: true, element: <HomePage /> },
          { path: "/", element: <HomePage /> },
        ],
      },
      {
        path: "voice",
        element: <VoicePage />,
        children: [
          { index: true, element: <VoiceActivePage /> },
          { path: "active", element: <VoiceActivePage /> },
          {
            path: "history",
            element: <VoiceHistoryPage />,
          },
          {
            path: "test",
            element: <TestVoicePage />,
          },
        ],
      },
      {
        path: "customer",
        element: <CustomerPage />,
        children: [{ index: true, element: <CustomerHomePage /> }],
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          { index: true, element: <SettingsAccountsPage /> },
          { path: "account", element: <SettingsAccountsPage /> },
          {
            path: "users",
            element: <SettingsUsersPage />,
          },
          {
            path: "profile",
            element: <SettingsProfilePage />,
            children: [{ path: ":user", element: <SettingsProfilePage /> }],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "auth/checkpoint/:data",
        element: <CheckpointPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
