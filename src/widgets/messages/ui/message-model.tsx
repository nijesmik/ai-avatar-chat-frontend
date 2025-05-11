import { Spinner } from "@heroui/react";

interface Props {
  message: Message;
}

const MessageModel = ({ message }: Props) => {
  const { text, chunks } = message.content;

  if (chunks && chunks.length === 0) {
    return (
      <article className="w-full p-4">
        <Spinner variant="dots" />
      </article>
    );
  }

  const content = chunks ? chunks.map(({ text }) => text).join("").trim() : text;

  return (
    <article className="w-full p-4">
      <p className="whitespace-pre-line">{content}</p>
    </article>
  );
};

export default MessageModel;
