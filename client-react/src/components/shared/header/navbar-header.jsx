import React from "react";
import AvatarHeader from "./avatar-header";
import NotificationButton from "../notification/notification-button";

import { Link } from "react-router-dom";
import { useStateContext } from "@/providers/AppContextProvider";
import { useLogoutMutation } from "@/pages/auth/services/mutations";
import TestCallButton from "./test-call-button";
import NotificationSound from "../notification/notification-audio";

export default function NavbarHeader() {
  const { user } = useStateContext();
  const { mutateAsync: logoutMutation } = useLogoutMutation();
  const isAdmin = user?.currentUser?.role === "admin";

  return (
    <header className="sticky top-0 z-10 flex h-[57px] w-full bg-teal-default items-center gap-1 border-b bg-background px-4 justify-between">
      <Link to="/" className="inline-flex gap-x-2 items-center text-[#F7F8F9]">
        <label className="truncate">コールセンター - イノ</label>
      </Link>
      {user.isAuthenticated ? (
        <nav className="flex h-full justify-end space-x md:space-x-2  items-center">
          {isAdmin && <TestCallButton />}
          <div>
            <NotificationSound />
          </div>
          <div>
            <NotificationButton />
          </div>
          <div>
            <AvatarHeader
              user={user?.currentUser}
              onLogout={async () => {
                await logoutMutation();
              }}
            />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
