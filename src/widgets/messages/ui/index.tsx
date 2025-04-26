import { useMessageStore } from "@/entities/message";

import MessageUser from "./message-user";

const Messages = () => {
  const messages = useMessageStore((state) => state.messages);

  return (
    <div className="flex size-full justify-center overflow-y-auto pb-20">
      <div className="w-full max-w-3xl">
        {messages.map((message) => {
          return <MessageUser key={message.time} message={message} />;
        })}
      </div>
    </div>
  );
};

export default Messages;
