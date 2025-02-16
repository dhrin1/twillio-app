import { useModalContext } from "@/providers/AppContextProvider";
import React from "react";
import ModalBaseAccount from "@/pages/dashboard/setting/accounts/container/create-account-modal";
import ModalUserAccount from "@/pages/dashboard/setting/users/container/user-account-modal";
import ModalCustomerEncode from "@/pages/dashboard/customer/container/encode-customer-modal";
import ModalVoiceCustomer from "@/pages/dashboard/home/container/modal-voice-customer";

export default function ModalContainer() {
  const { isOpen, setIsOpen } = useModalContext();
  const onClose = () => {
    setIsOpen({
      ...isOpen,
      visible: false,
    });
  };
  return (
    <div>
      {isOpen.target === "base-account" && (
        <ModalBaseAccount isOpen={isOpen} onClose={onClose} />
      )}
      {isOpen.target === "user-account" && (
        <ModalUserAccount isOpen={isOpen} onClose={onClose} />
      )}
      {isOpen.target === "encode-customer" && (
        <ModalCustomerEncode isOpen={isOpen} onClose={onClose} />
      )}
      {isOpen.target === "customer-details" && (
        <ModalVoiceCustomer isOpen={isOpen} onClose={onClose} />
      )}
    </div>
  );
}
