interface Props {
  message: Message;
}

const MessageUser = ({ message }: Props) => {
  return (
    <article className="flex w-full justify-end p-4">
      <div className="bg-default-100 max-w-2/3 rounded-3xl px-5 py-2">
        {message.content.text}
      </div>
    </article>
  );
};

export default MessageUser;
