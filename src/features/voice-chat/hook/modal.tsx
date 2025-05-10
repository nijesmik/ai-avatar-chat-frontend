"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

import { SelectModel } from "@/features/model";

import Avatar from "../ui/avatar";
import ButtonClose from "../ui/button-close";
import ButtonMute from "../ui/button-mute";
import SelectAvatar from "../ui/select-avatar";
import { useVoiceChatConnect } from "./connect";

export const useVoiceChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, disconnect } = useVoiceChatConnect();

  const openModal = () => {
    connect();
    onOpen();
  };

  const VoiceChatModal = () => {
    return (
      <Modal
        hideCloseButton
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        isOpen={isOpen}
        size="full"
      >
        <ModalContent>
          <ModalHeader className="justify-between">
            <SelectModel />
            <SelectAvatar />
          </ModalHeader>
          <ModalBody className="items-center justify-center">
            <Avatar />
          </ModalBody>
          <ModalFooter className="justify-center pb-8">
            <div className="flex gap-6">
              <ButtonMute />
              <ButtonClose onClose={onClose} onDisconnect={disconnect} />
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return { openModal, VoiceChatModal };
};
