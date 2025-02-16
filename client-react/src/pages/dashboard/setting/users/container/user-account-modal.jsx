import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserAccountForm from "./user-account-form";

export default function ModalUserAccount(props) {
  const { isOpen, onClose } = props;
  const { options } = isOpen;

  return (
    <>
      <Dialog open={isOpen.visible} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit user</DialogTitle>
          </DialogHeader>
          {options.action === "edit" && (
            <UserAccountForm options={options} onClose={onClose} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
