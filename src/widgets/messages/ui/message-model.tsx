interface Props {
  message: Message;
}

const MessageModel = ({ message }: Props) => {
  const { text } = message.content;

  return <article className="w-full p-4">{text}</article>;
};

export default MessageModel;
