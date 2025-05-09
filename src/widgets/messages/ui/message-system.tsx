import { Alert } from "@heroui/react";

interface Props {
  message: Message;
}

const MessageSystem = ({ message }: Props) => {
  const { text } = message.content;

  return (
    <article className="w-full p-4">
      <Alert color="warning">{text}</Alert>
    </article>
  );
};

export default MessageSystem;
