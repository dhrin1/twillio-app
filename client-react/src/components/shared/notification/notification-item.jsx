import React from "react";

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Phone, User } from "lucide-react";
import { useModalContext } from "@/providers/AppContextProvider";

export default function NotificationItem({ item, onAccept, onAcceptLoad }) {
  const { customerAccount, baseAccount, remarks, createdDate } = item;
  const { setIsOpen } = useModalContext();

  return (
    <>
      <AccordionTrigger
        className={`text-sm font-normal outline-none hover:no-underline  ${
          remarks === "A" ? `text-gray-500` : ``
        }`}
      >
        <div className="inline-flex gap-x-2 w-full ">
          <div className="size-10 flex items-center justify-center rounded-full  ">
            <Phone />
          </div>
          <div className="grid text-start">
            <label className="font-medium relative">
              {customerAccount.accountNumber} to {baseAccount.name}
              {item.status ? (
                <label className="absolute -top-3 -left-3 text-xs ">New</label>
              ) : null}
            </label>
            <p className="text-xs font-light">{createdDate}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex space-x-2 justify-end">
          {remarks === "P" && (
            <Button variant="ghost" disabled={onAcceptLoad} onClick={onAccept}>
              <Phone size={16} className="mr-2" /> Accept
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() =>
              setIsOpen({
                target: "customer-details",
                visible: true,
                options: { id: customerAccount.customerId, action: "edit" },
              })
            }
          >
            <User size={16} className="mr-2" />
            Details
          </Button>
        </div>
      </AccordionContent>
    </>
  );
}
