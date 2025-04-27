import { Textarea } from "@heroui/react";
import { useCallback, useRef, useState } from "react";

import ButtonSendMessage from "./button-send-message";

const Input = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [hasText, setHasText] = useState(false);

  const sendMessage = useCallback(() => {
    const text = textRef.current?.value;
    // TODO: send message
  }, [textRef.current]);

  return (
    <div className="relative mb-8 flex w-full justify-center">
      <Textarea
        ref={textRef}
        classNames={{
          base: "absolute bottom-0 z-10  max-w-3xl px-4",
          inputWrapper:
            "rounded-3xl p-3 group-data-[focus=true]:border-default-400 bg-background",
          innerWrapper: "flex-col ",
          input: "text-medium !px-3",
        }}
        endContent={
          <div className="flex w-full justify-end pt-1">
            <ButtonSendMessage hasText={hasText} onClick={sendMessage} />
          </div>
        }
        maxRows={12}
        minRows={1}
        placeholder="무엇이든 물어보세요"
        variant="bordered"
        onValueChange={(value) => setHasText(Boolean(value))}
      />
    </div>
  );
};

export default Input;
