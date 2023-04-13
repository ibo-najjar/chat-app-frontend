import { Session } from "next-auth";
import Feed from "./Feed/Feed";
import ConversationsWrapper from "./Conversation/Conversation";
import { useRouter } from "next/router";
import { cn } from "@/src/lib/util";

interface IChatProps {
  session: Session;
}

const Chat: React.FC<IChatProps> = ({ session }) => {
  const router = useRouter();
  const {
    query: { conversationId },
  } = router;

  //console.log("user", session.user);

  return (
    <div className="relative h-screen flex justify-center overflow-x-hidden pt-20 max-w-7xl mx-auto">
      <div
        className={cn(
          "",
          conversationId ? "hidden sm:inline w-[280px]" : "w-full sm:w-[280px]"
        )}
      >
        <ConversationsWrapper session={session} />
      </div>
      <div className={conversationId ? "flex-1" : "hidden sm:inline flex-1"}>
        {conversationId ? (
          <Feed session={session} />
        ) : (
          <div className="text-2xl flex-1 items-center justify-center h-full w-full flex">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
