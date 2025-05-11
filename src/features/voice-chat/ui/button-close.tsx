import { Button } from "@heroui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { useAvatarStore } from "@/features/avatar";
import { useVoiceChatStore } from "@/features/voice-chat";
import { Tooltip, toast } from "@/shared/ui";

interface Props {
  onClose: () => void;
  onDisconnect: () => void;
}

const ButtonClose = ({ onClose, onDisconnect }: Props) => {
  const isConnected = useVoiceChatStore((state) => state.isConnected);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setIsActive(true);
    }
    if (!isConnected && isActive) {
      setIsActive(false);
      onClose();
      toast.error("서버와 연결이 끊겼습니다.");
    }
  }, [isConnected, isActive]);

  return (
    <Tooltip content="끝내기">
      <Button
        isIconOnly
        className="size-16"
        radius="full"
        size="lg"
        variant="flat"
        onPress={() => {
          onDisconnect();
          setIsActive(false);
          onClose();
          useAvatarStore.getState().cancelVisemeAnimation();
        }}
      >
        <X size={28} />
      </Button>
    </Tooltip>
  );
};

export default ButtonClose;
