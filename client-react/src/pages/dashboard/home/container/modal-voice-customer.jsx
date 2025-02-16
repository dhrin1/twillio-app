import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditCustomerForm from "../../customer/container/edit-customer-form";

export default function ModalVoiceCustomer(props) {
  const { isOpen, onClose } = props;
  const { options } = isOpen;
  return (
    <Dialog open={isOpen.visible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <EditCustomerForm options={options} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
