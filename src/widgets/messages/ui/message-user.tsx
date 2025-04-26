import { twMerge } from "tailwind-merge";

interface Props {
  message: Message;
}

const MessageUser = ({ message }: Props) => {
  const { text, type } = message.content;
  const content = type === "speech" ? `"${text}"` : text;

  return (
    <article className="flex w-full justify-end p-4">
      <div
        className={twMerge(
          "bg-default-100 max-w-2/3 rounded-3xl px-5 py-2",
          type === "speech" && "text-default-500 italic",
        )}
      >
        {content}
      </div>
    </article>
  );
};

export default MessageUser;
