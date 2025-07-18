"use client";

import { twMerge } from "tailwind-merge";

import { useMessageStore } from "@/entities/message";
import { Input } from "@/widgets/input";
import { Messages } from "@/widgets/messages";

const Chat = () => {
  const hasMessages = useMessageStore((state) =>
    Boolean(state.messages.length),
  );

  return (
    <div
      className={twMerge(
        "grid size-full grid-cols-1 grid-rows-[1fr_auto]",
        !hasMessages && "sm:flex sm:flex-col sm:justify-center",
      )}
    >
      {!hasMessages && (
        <div className="flex w-full translate-y-16 flex-col justify-center max-sm:h-full">
          <div className="mb-1 text-center text-3xl font-semibold sm:text-4xl">
            안녕하세요! 👋
          </div>
          <div className="text-center text-xl font-semibold sm:text-2xl">
            오늘은 어떤 이야기 나눠볼까요? 😊
          </div>
        </div>
      )}
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
