import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useNotificationEvent } from "@/pages/dashboard/home/services/queries";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { voiceNotifObject } from "@/actions/useGetNotification";
import { useAcceptCallsMutation } from "@/pages/dashboard/home/services/mutations";
import { Phone } from "lucide-react";

export default function ToastContainer() {
  const { data: notificationData, isPending } = useNotificationEvent();
  const { mutateAsync: updateStatus, isPending: onAcceptLoad } =
    useAcceptCallsMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isPending) {
      const notifPayload = notificationData;
      notifPayload?.data
        ?.filter((v) => v.remarks === "P")
        .map((i, _) => {
          const { id, customerAccount, baseAccount, createdDate } =
            voiceNotifObject(i);
          toast({
            variant: "success",
            title: `${customerAccount?.accountNumber} to ${baseAccount.name}`,
            description: `${createdDate}`,
            action: (
              <div>
                <ToastAction
                  disabled={onAcceptLoad}
                  className="hover:bg-green-default"
                  onClick={async () => await updateStatus({ id: id })}
                  altText="Accept"
                >
                  <Phone size={16} className="mr-2" /> Accept
                </ToastAction>
              </div>
            ),
          });
        });
    }
  }, [isPending]);

  return (
    <>
      <Toaster />
    </>
  );
}
