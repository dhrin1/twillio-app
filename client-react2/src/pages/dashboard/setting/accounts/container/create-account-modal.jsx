import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CreateAccountForm from "./create-account-form";
import EditAccountForm from "./edit-account-form";

export default function ModalBaseAccount(props) {
  const { isOpen, onClose } = props;
  const { options } = isOpen;

  return (
    <>
      <Dialog open={isOpen.visible} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Number</DialogTitle>
          </DialogHeader>
          {options.action === "edit" && (
            <EditAccountForm options={options} onClose={onClose} />
          )}
          {options.action === "create" && (
            <CreateAccountForm onClose={onClose} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
