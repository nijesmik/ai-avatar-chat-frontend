import { Button } from "@heroui/react";
import { CornerDownLeft } from "lucide-react";

import { useWebSocketStore } from "@/features/websocket";
import ButtonVoiceChat from "@/widgets/input/ui/button-voice-chat";

import { useInputStore } from "../store";

const ButtonSendMessage = () => {
  const isConnected = useWebSocketStore((state) => state.isConnected);
  const hasText = useInputStore((state) => Boolean(state.value.trim()));
  const { sendMessage } = useInputStore.getState();

  if (!hasText && isConnected) {
    return <ButtonVoiceChat />;
  }

  return (
    <Button
      isIconOnly
      color="primary"
      isDisabled={!hasText}
      radius="full"
      onPress={sendMessage}
    >
      <CornerDownLeft />
    </Button>
  );
};

export default ButtonSendMessage;
