import { Button } from "@heroui/react";
import { CornerDownLeft } from "lucide-react";

import { useWebSocketStore } from "@/features/websocket";
import ButtonVoiceChat from "@/widgets/input/ui/button-voice-chat";

interface Props {
  onClick: () => void;
  hasText: boolean;
}

const ButtonSendMessage = ({ onClick, hasText }: Props) => {
  const isConnected = useWebSocketStore((state) => state.isConnected);

  if (!hasText && isConnected) {
    return <ButtonVoiceChat />;
  }

  return (
    <Button
      isIconOnly
      color="primary"
      isDisabled={true || !hasText} // TODO: remove true after implementing text mode
      radius="full"
      onPress={onClick}
    >
      <CornerDownLeft />
    </Button>
  );
};

export default ButtonSendMessage;
