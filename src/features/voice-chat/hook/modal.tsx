"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

import AvatarCanvas from "@/features/avatar";

import ButtonClose from "../ui/button-close";
import ButtonMute from "../ui/button-mute";
import { useVoiceChatConnect } from "./connect";

export const useVoiceChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, disconnect } = useVoiceChatConnect();

  const closeModal = () => {
    disconnect();
    onClose();
  };

  const openModal = () => {
    connect();
    onOpen();
  };

  const VoiceChatModal = () => {
    return (
      <Modal hideCloseButton isOpen={isOpen} size="full" onClose={closeModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="items-center justify-center">
                <AvatarCanvas />
              </ModalBody>
              <ModalFooter className="justify-center pb-6">
                <div className="flex gap-6">
                  <ButtonMute />
                  <ButtonClose onClick={onClose} />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  return { openModal, VoiceChatModal };
};
