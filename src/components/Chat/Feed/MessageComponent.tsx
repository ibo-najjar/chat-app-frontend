import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";

interface IMessageComponentProps {
  message: any;
  isMe: boolean;
  showName: boolean | undefined;
  conversationData: any;
}

const MessageComponent: React.FC<IMessageComponentProps> = ({
  message,
  isMe,
  showName,
  conversationData,
}) => {
  // convert created at to relative time
  const createdAt =
    new Date(message.createdAt).getHours() +
    ":" +
    new Date(message.createdAt).getMinutes();
  return (
    <div
      className="w-full flex space-x-3 px-3 py-1 items-center hover:bg-secondary group"
      style={{ marginTop: showName ? "10px" : "0px" }}
    >
      {showName ? (
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-lg select-none flex-shrink-0 "
            alt="user profile picture"
            src={message.sender.imageUrl}
          />
        </div>
      ) : (
        <div className="w-10 text-xs">
          <p className=" hidden group-hover:inline text-neutral-400">
            {createdAt}
          </p>
        </div>
      )}

      <div className="flex flex-col  w-full max-w-3xl">
        {showName && (
          <div className="flex space-x-4 w-full items-center">
            <span className="text-md font-semibold leading-4">
              {message.sender.username}
            </span>
            <span className="text-xs text-neutral-400">
              {formatRelative(new Date(message.createdAt), new Date(), {
                locale: enUS,
              })}
            </span>
          </div>
        )}
        <p className="font text-md text-neutral-200">{message.body}</p>
      </div>
    </div>
  );
};

export default MessageComponent;
