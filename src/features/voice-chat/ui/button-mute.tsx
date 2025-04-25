import { Button } from "@heroui/react";
import { Mic, MicOff } from "lucide-react";

import { Tooltip } from "@/shared/ui";

import { useVoiceChatStore } from "../store";

const ButtonMute = () => {
  const isMuted = useVoiceChatStore((state) => state.isMuted);
  const { toggleMute, label } = useVoiceChatStore.getState();

  const tooltip = isMuted ? "마이크 켜기" : "마이크 끄기";

  return (
    <Tooltip
      content={
        <div className="flex flex-col">
          <span>{tooltip}</span>
          <span className="text-default-400">{label}</span>
        </div>
      }
    >
      <Button
        isIconOnly
        className="size-16"
        color={isMuted ? "danger" : "default"}
        radius="full"
        size="lg"
        variant="flat"
        onPress={toggleMute}
      >
        {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
      </Button>
    </Tooltip>
  );
};

export default ButtonMute;
