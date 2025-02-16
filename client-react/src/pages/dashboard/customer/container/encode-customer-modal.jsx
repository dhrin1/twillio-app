import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EditCustomerForm from "./edit-customer-form";

export default function ModalCustomerEncode(props) {
  const { isOpen, onClose } = props;
  const { options } = isOpen;
  return (
    <Dialog open={isOpen.visible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customer</DialogTitle>
        </DialogHeader>
        {options.action === "edit" && (
          <EditCustomerForm options={options} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
