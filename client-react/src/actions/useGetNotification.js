import { useState, useEffect, useRef } from "react";
import {
  useCounterCard,
  useNotificationEvent,
} from "@/pages/dashboard/home/services/queries";
import { useStateContext } from "@/providers/AppContextProvider";
import { useToast } from "@/components/ui/use-toast";
import { useCustomerQuery } from "@/pages/dashboard/customer/services/queries";

export default function useGetNotification({ acceptBtn }) {
  const { event } = useStateContext();
  const {
    data: notificationData,
    isPending,
    refetch: refetchNotification,
  } = useNotificationEvent();
  const { refetch: refetchCounterCard } = useCounterCard();
  const { refetch: refetchCustomers } = useCustomerQuery();
  const toastIdRef = useRef(null);
  const { toast, dismiss } = useToast();

  const [initData, setInitData] = useState([]);

  useEffect(() => {
    const notifPayload = notificationData?.data?.map((notification) =>
      voiceNotifObject(notification)
    );
    setInitData(notifPayload);
  }, [isPending]);

  useEffect(() => {
    if (event.pooling) {
      refetchNotification();
      const {
        id,
        customer_account,
        base_account,
        remarks,
        active,
        created_at,
      } = event.payload.notification;
      const { status } = event.payload.customer;
      switch (event.flag) {
        case "create":
          const toastEntry = toast({
            id: id,
            variant: "success",
            title: `${customer_account?.account_number} to ${base_account.name}`,
            description: `${created_at}`,
            action: acceptBtn({
              id,
              status,
              customerAccount: {
                customerId: customer_account.id,
              },
            }),
          });
          toastIdRef.current = toastEntry;
          setInitData((prevData) => {
            const newData = [
              ...prevData,
              voiceNotifObject({ ...event.payload.notification, status }),
            ];
            newData.sort((a, b) => b.id - a.id);
            return newData;
          });
          refetchCounterCard();
          refetchCustomers();
          break;
        case "update":
          const index = initData.findIndex((v) => v.id === id);
          const prevData = [...initData];
          if (index !== -1) {
            prevData[index] = {
              ...prevData[index],
              remarks,
              active,
            };
          }
          setInitData(prevData);

          if (toastIdRef.current) {
            dismiss(toastIdRef.current.id);
          }

          break;
        default:
          console.log("The actions is unmap.");
          break;
      }
    }
  }, [event.pooling]);

  return {
    event,
    data: initData,
    pendingCalls: notificationData?.pending_calls,
    isPending,
    setInitData,
  };
}

export const voiceNotifObject = (notification) => {
  const {
    id,
    base_account,
    customer_account,
    active,
    created_at,
    direction,
    event,
    originCountry,
    remarks,
    status,
  } = notification;
  return {
    id: id,
    baseAccount:
      Object.keys(base_account).length > 0
        ? {
            accountNumber: base_account.account_number,
            name: base_account.name,
          }
        : {},
    customerAccount:
      Object.keys(customer_account).length > 0
        ? {
            customerId: customer_account.id,
            accountNumber: customer_account.account_number,
            name: customer_account.name,
          }
        : {},
    active: active,
    createdDate: created_at,
    direction: direction,
    event: event,
    originCountry: originCountry,
    remarks: remarks,
    status: typeof status !== "undefined" && status !== "exist" ? status : null,
  };
};
