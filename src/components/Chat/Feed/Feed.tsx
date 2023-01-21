import { Session } from "next-auth";
import { useRouter } from "next/router";
import { BsStars } from "react-icons/bs";
import ChatBar from "./ChatBar";
import MessageBox from "./MessageBox";
import { RecievedMessage } from "./RecievedMessage";
import { SentMessage } from "./SentMessage";

interface IFeedProps {
  session: Session;
}

const Feed: React.FC<IFeedProps> = ({ session }) => {
  const router = useRouter();
  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;

  return (
    <>
      <ChatBar />

      <div className="flex-1 flex flex-col justify-end px-5 py-2 space-y-7">
        <RecievedMessage />

        <SentMessage />
      </div>

      {typeof conversationId === "string" && (
        <MessageBox session={session} conversationId={conversationId} />
      )}
    </>
  );
};

export default Feed;
