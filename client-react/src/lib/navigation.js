import {
  Home,
  Phone,
  Users,
  AreaChart,
  Settings,
  User,
  PhoneIncoming,
  History,
  LayoutDashboard,
  UserCog,
} from "lucide-react";

export const sidebarRoutes = [
  {
    title: "Home",
    name: "home",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Voice",
    name: "voice",
    path: "/voice",
    icon: Phone,
    children: [
      {
        title: "Active calls",
        name: "active calls",
        path: "voice/active",
        icon: PhoneIncoming,
      },
      {
        title: "Call history",
        name: "call hitory",
        path: "voice/history",
        icon: History,
      },
    ],
  },
  {
    title: "Customer",
    name: "customer",
    path: "/customer",
    icon: Users,
    children: [
      { title: "Customer", name: "active calls", path: "customer", icon: User },
    ],
  },
  // {
  //   title: "Analytics",
  //   name: "analytics",
  //   path: "/analytics",
  //   icon: AreaChart,
  // },
  {
    title: "Settings",
    name: "settings",
    path: "/settings",
    icon: Settings,
    children: [
      {
        title: "Account",
        name: "account",
        path: "settings/account",
        icon: Phone,
      },
      { title: "Users", name: "users", path: "settings/users", icon: Users },
      { title: "My Account", name: "separator" },
      {
        title: "Profile",
        name: "profile",
        path: "settings/profile",
        icon: UserCog,
      },
    ],
  },
];
