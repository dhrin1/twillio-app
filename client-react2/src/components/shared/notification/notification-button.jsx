import React, { useEffect, useState } from "react";
import { BellRing, Phone, User } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import useGetNotification from "@/actions/useGetNotification";
import { ToastAction } from "@/components/ui/toast";
import { useAcceptCallsMutation } from "@/pages/dashboard/home/services/mutations";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { useModalContext } from "@/providers/AppContextProvider";

import NotificationItem from "./notification-item";
import NotificationNone from "./notification-none";

const NotifcationBadge = ({ notifNumber }) => {
  return (
    <div className="absolute flex items-center justify-center border rounded-full  bg-[#2AC65A] size-5 text-white border-white  -top-1 -right-2 text-xs">
      {notifNumber}
    </div>
  );
};

export default function NotificationButton() {
  const { mutateAsync: updateStatus, isPending: onAcceptLoad } =
    useAcceptCallsMutation();
  const { setIsOpen } = useModalContext();
  const {
    event,
    data,
    pendingCalls,
    isPending: onNotifLoad,
  } = useGetNotification({
    acceptBtn: ({ id, status, customerAccount }) => (
      <div className="grid gap-y-2">
        <ToastAction
          className="hover:bg-green-default"
          onClick={async () => await updateStatus({ id: id })}
          altText="Accept"
        >
          <Phone size={16} className="mr-2" /> Accept
        </ToastAction>
        {status === "new" && (
          <ToastAction
            className="hover:bg-green-default"
            onClick={() =>
              setIsOpen({
                target: "customer-details",
                visible: true,
                options: { id: customerAccount.customerId, action: "edit" },
              })
            }
            altText="Details"
          >
            <User size={16} className="mr-2" /> Details
          </ToastAction>
        )}
      </div>
    ),
  });

  const [notification, setNotification] = useState({
    swingBell: false,
  });

  useEffect(() => {
    if (event.flag === "create" && event.pooling) {
      setNotification({ swingBell: true });
    }
  }, [event.flag, event.pooling]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNotification({ swingBell: false });
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [notification.swingBell]);

  // console.log(data[0].id);

  return (
    <>
      <DropdownMenu onClosed={false}>
        <DropdownMenuTrigger
          asChild
          className="h-full outline-none focus:ring-0 cursor-pointer"
        >
          <Button
            type="button"
            className="cursor-pointer rounded-full md:border flex relative group text-[#F7F8F9]"
          >
            {pendingCalls !== 0 && !onNotifLoad && (
              <>
                <NotifcationBadge notifNumber={pendingCalls} />
              </>
            )}
            <BellRing
              className={`size-4 md:mr-2  ${
                notification.swingBell ? "animate-swing" : ""
              }`}
            />
            <span className="hidden md:block select-none">Notification</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[40vh] p-0 rounded-sm">
          <DropdownMenuLabel>Notification Center</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="h-96 overflow-y-scroll divide-y">
            <Accordion collapsible className="size-full  items-center">
              {onNotifLoad ? (
                <div className="flex flex-col space-y-1">
                  {new Array(20).fill(0).map((_, idx) => (
                    <Skeleton className="h-14 w-full rounded-none" key={idx} />
                  ))}
                </div>
              ) : data?.length === 0 ? (
                <NotificationNone />
              ) : (
                data?.map((notif, idx) =>
                  notif.event === "voice" ? (
                    <AccordionItem
                      key={idx}
                      value={`item-${idx}`}
                      className={`${
                        notif.remarks === "P"
                          ? "bg-[#2AC65A] text-neutral-100"
                          : notif.remarks === "A"
                          ? "bg-gray "
                          : ""
                      } rounded-none px-3`}
                    >
                      <NotificationItem
                        item={notif}
                        onAccept={async () =>
                          await updateStatus({ id: notif.id })
                        }
                        onAcceptLoad={
                          onAcceptLoad && +notif.id === +data[idx].id
                        }
                      />
                    </AccordionItem>
                  ) : null
                )
              )}
            </Accordion>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
