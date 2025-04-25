import { Button } from "@heroui/react";
import { AudioLines } from "lucide-react";

import { useVoiceChatModal } from "@/features/voice-chat";
import { Tooltip } from "@/shared/ui";

const ButtonVoiceChat = () => {
  const { openModal, VoiceChatModal } = useVoiceChatModal();
  return (
    <>
      <Button isIconOnly color="primary" radius="full" onPress={openModal}>
        <Tooltip className="px-3 py-2" content="음성 모드 사용" offset={15}>
          <AudioLines />
        </Tooltip>
      </Button>
      <VoiceChatModal />
    </>
  );
};

export default ButtonVoiceChat;
