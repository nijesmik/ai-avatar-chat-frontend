import { useMessageStore } from "@/entities/message";

import MessageUser from "./message-user";

const Messages = () => {
  const messages = useMessageStore((state) => state.messages);

  return (
    <div className="flex w-full max-w-[64rem] flex-col">
      {messages.map((message) => {
        return <MessageUser key={message.content.text} message={message} />;
      })}
    </div>
  );
};

export default Messages;
