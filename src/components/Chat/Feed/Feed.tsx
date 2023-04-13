import { useQuery } from "@apollo/client";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import ChatBar from "./ChatBar";
import MessageBox from "./MessageBox";
import MessageOperations from "../../../graphql/operations/messages";
import ConversationOperations from "../../../graphql/operations/conversation";
import { MessageSubscriptionData } from "@/src/util/types";
import { useEffect } from "react";
import MessageComponent from "./MessageComponent";
import toast from "react-hot-toast";
import MessagesSkeleton from "../../Skeleton/MessagesSkeleton";

interface IFeedProps {
  session: Session;
}

const Feed: React.FC<IFeedProps> = ({ session }) => {
  const router = useRouter();
  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;

  const { data, loading, error, subscribeToMore } = useQuery<any, any>(
    MessageOperations.Query.messages,
    {
      variables: {
        conversationId: conversationId,
      },
      onError: ({ message }) => {
        console.log(message);
        toast.error(message);
      },
    }
  );

  const subscribeToNewMessages = (conversationId: string) => {
    subscribeToMore({
      document: MessageOperations.Subscription.messageSent,
      variables: {
        conversationId: conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessageSubscriptionData) => {
        if (!subscriptionData.data) return prev;

        //console.log("subscriptionData", subscriptionData);
        console.log("prev", prev);
        const newMessage = subscriptionData.data.messageSent;
        console.log("newMessage", newMessage);
        const returnValue: any = Object.assign({}, prev, {
          messages:
            newMessage.sender.id === userId
              ? prev.messages
              : [newMessage, ...prev.messages],
        });
        return returnValue;
      },
    });
  };

  useEffect(() => {
    // execute the subscription on mount
    if (typeof conversationId === "string") {
      subscribeToNewMessages(conversationId);
    }
  }, [conversationId]);

  const { data: conversationData, loading: convoLoading } = useQuery<any, any>(
    ConversationOperations.Queries.conversation,
    {
      variables: {
        conversationId,
      },
      onError: (err: any) => {
        console.log(err);
        toast.error("chatbar " + err.message);
      },
    }
  );
  let nextSenderId: boolean | undefined = undefined;

  return (
    <div className="h-full ">
      <div className="h-14">
        <ChatBar
          session={session}
          data={conversationData}
          loading={convoLoading}
          conversationId={conversationId as any}
        />
      </div>
      <div className="flex flex-col-reverse h-[calc(100vh-80px-136px)] flex-shrink-0 overflow-auto ">
        {loading ? (
          <MessagesSkeleton />
        ) : (
          data?.messages && (
            <>
              {data.messages.map((message: any, i: number, elements: any) => {
                if (elements[i + 1]) {
                  nextSenderId = elements[i + 1].sender.id;
                }
                let showName = nextSenderId !== message.sender.id;
                // check if last then show name true
                if (i === elements.length - 1) {
                  showName = true;
                }
                return (
                  <MessageComponent
                    message={message}
                    key={message.id}
                    isMe={userId === message.sender.id}
                    showName={showName}
                    conversationData={conversationData}
                  />
                );
              })}
            </>
          )
        )}
      </div>

      <div className="h-20 pb-6 px-2 pt-2">
        {typeof conversationId === "string" && (
          <MessageBox session={session} conversationId={conversationId} />
        )}
      </div>
    </div>
  );
};

export default Feed;
