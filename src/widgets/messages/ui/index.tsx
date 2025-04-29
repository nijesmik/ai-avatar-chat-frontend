import { Spacer } from "@heroui/react";

import { useMessageStore } from "@/entities/message";

import MessageModel from "./message-model";
import MessageUser from "./message-user";

const Messages = () => {
  const messages = useMessageStore((state) => state.messages);

  return (
    <div className="flex max-h-full w-full justify-center overflow-y-auto">
      <div className="w-full max-w-3xl">
        {messages.map((message) => {
          if (message.role === "model") {
            return <MessageModel key={message.time} message={message} />;
          }
          return <MessageUser key={message.time} message={message} />;
        })}
        <Spacer y={48} />
      </div>
    </div>
  );
};

export default Messages;
