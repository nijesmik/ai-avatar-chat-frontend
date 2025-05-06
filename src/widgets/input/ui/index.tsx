import { Textarea } from "@heroui/react";
import { memo, useCallback, useMemo, useRef } from "react";

import { useInputStore } from "../store";
import ButtonSendMessage from "./button-send-message";

const Input = () => {
  const value = useInputStore((state) => state.value);
  const compositionRef = useRef(false);
  const { setValue, sendMessage } = useInputStore.getState();

  const endContent = useMemo(
    () => (
      <div className="flex w-full justify-end pt-1">
        <ButtonSendMessage />
      </div>
    ),
    [],
  );

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (compositionRef.current) {
      return;
    }
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  }, []);

  const onCompositionStart = useCallback(() => {
    compositionRef.current = true;
  }, []);

  const onCompositionEnd = useCallback(() => {
    compositionRef.current = false;
  }, []);

  return (
    <div className="relative mb-8 flex w-full justify-center">
      <Textarea
        classNames={{
          base: "absolute bottom-0 z-10  max-w-3xl px-4",
          inputWrapper:
            "rounded-3xl p-3 group-data-[focus=true]:border-default-400 bg-background",
          innerWrapper: "flex-col ",
          input: "text-medium !px-3",
        }}
        endContent={endContent}
        maxRows={12}
        minRows={1}
        placeholder="무엇이든 물어보세요"
        value={value}
        variant="bordered"
        onCompositionEnd={onCompositionEnd}
        onCompositionStart={onCompositionStart}
        onKeyDown={onKeyDown}
        onValueChange={setValue}
      />
    </div>
  );
};

export default memo(Input);
