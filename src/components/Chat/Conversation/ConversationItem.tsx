import { Session } from "next-auth";
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";
import Image from "next/image";

interface Conversation {
  id: string;
  name: string | null;
  adminId: string | null;
  latitude: number | null;
  longitude: number | null;
  bio: string | null;
  groupRadius: number | null;
  updatedAt: string;
  participants: [
    {
      hasSeenLatest: boolean;
      user: {
        id: string;
        username: string;
        imageUrl: string;
      };
    }
  ];
  latestMessage: {
    id: string;
    body: string;
    createdAt: string;
    sender: {
      id: string;
      username: string;
    };
  };
}

interface IConversationItemProps {
  conversation: Conversation;
  session: Session;
  onConversationClick: (conversationId: string) => void;
}

const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday'",
  today: "p",
  other: "MM/dd/yyyy",
};

const ConversationItem: React.FC<IConversationItemProps> = ({
  conversation,
  session,
  onConversationClick,
}) => {
  const isGroup: boolean = conversation?.name !== null;

  const otherUser = conversation?.participants?.find(
    (p) => p.user.id !== session?.user?.id
  );

  return (
    <div
      className="flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-secondary"
      onClick={() => onConversationClick(conversation.id)}
    >
      <div className="flex-shrink-0 relative h-10 w-10">
        {isGroup ? (
          <Image
            src={false || "/default.png"}
            alt="user profile picture"
            className="rounded-lg"
            fill
          />
        ) : (
          <Image
            src={otherUser?.user.imageUrl || "/default.png"}
            alt="user profile picture"
            className="rounded-lg object-cover"
            fill
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h1 className="font-medium leading-5 w-32 truncate">
            {isGroup ? conversation?.name : otherUser?.user.username}
          </h1>
          <span className="text-xs text-neutral-400">
            {conversation?.latestMessage?.createdAt &&
              formatRelative(
                new Date(conversation.latestMessage.createdAt),
                new Date(),
                {
                  locale: {
                    ...enUS,
                    formatRelative: (token) =>
                      formatRelativeLocale[
                        token as keyof typeof formatRelativeLocale
                      ],
                  },
                }
              )}
          </span>
        </div>
        <p className="font-normal text-sm text-neutral-400 w-[180px] truncate">
          {conversation.latestMessage?.body
            ? conversation.latestMessage?.body
            : "No messages yet"}
        </p>
      </div>
    </div>
  );
};

export default ConversationItem;
