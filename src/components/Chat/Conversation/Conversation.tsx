import {
  CreateConversationData,
  CreateConversationInput,
  SearchUsersData,
  SearchUsersInput,
} from "@/src/util/types";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Session } from "next-auth";
import UserOperations from "../../../graphql/operations/user";
import ConversationOperations from "../../../graphql/operations/conversation";
import { calculateDistance } from "../../../util/distance";
import { useRouter } from "next/router";
import { Key, useEffect } from "react";

const ConversationsWrapper: React.FC<IConversationsWrapperProps> = ({
  session,
}) => {
  const router = useRouter();
  // get conversations
  const {
    data: convData,
    loading: convLoading,
    error: convError,
    subscribeToMore,
  } = useQuery<any>(ConversationOperations.Queries.getConversations);
  //console.log("QUERYDATA", convData);

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: {
              conversationCreated: any;
            };
          };
        }
      ) => {
        //console.log("subscriptionData", subscriptionData);
        //console.log("prev", prev);
        if (!subscriptionData.data) return prev;
        //console.log("SUBSCRIPTIONDATA", subscriptionData);
        const newConversation = subscriptionData.data.conversationCreated;
        //console.log("newConversation", newConversation);
        const returnValue = Object.assign({}, prev, {
          getConversations: [...prev.getConversations, newConversation],
        });
        //console.log("returnValue", returnValue);
        return returnValue;
      },
    });
  };

  useEffect(() => {
    // execute the subscription on mount
    subscribeToNewConversations();
    seacrhUsers({ variables: { username: "" } });
  }, []);

  // User search
  const [seacrhUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    seacrhUsers({ variables: { username: value } });
  };

  // Create conversation
  const [createConversation, { loading: conversationLoading }] = useMutation<
    CreateConversationData,
    CreateConversationInput
  >(ConversationOperations.Mutations.createConversation);

  const onCreateConversation = async (pId: string) => {
    try {
      const { data } = await createConversation({
        variables: {
          participantIds: [pId, session.user.id],
        },
      });
      if (!data?.createConversation) {
        throw new Error("Conversation not created");
      }
      const {
        createConversation: { conversationId },
      } = data;
      router.push({ query: { conversationId } });
      //console.log(data);
    } catch (e) {
      console.log("onCreateConversation error", e);
    }
  };

  const onConversationClick = (conversationId: string) => {
    router.push({ query: { conversationId } });
    // mark as read
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary items-center">
      <div className="px-3 py-4 flex-1 space-y-2">
        <h3>Search users</h3>
        <input
          className=" rounded-md bg-secondary text-white outline-none  w-52 px-2"
          onChange={onSearch}
        />
        {data?.searchUsers?.map((user) => (
          <div key={user.id} className="grid grid-cols-2 items-center">
            <div className="flex items-center justify-center flex-col">
              <div>{user.username}</div>
              <div>
                {calculateDistance(
                  parseFloat(user.latitude),
                  parseFloat(user.longitude),
                  session
                ).toFixed(0)}{" "}
                km
              </div>
            </div>
            <button
              className="button"
              onClick={() => onCreateConversation(user.id)}
            >
              Send
            </button>
          </div>
        ))}
      </div>
      <div className="px-2 py-3 space-y-1">
        {convData?.getConversations?.map((conversation: any) => (
          <button
            className="button w-full"
            key={conversation.id}
            onClick={() => onConversationClick(conversation.id)}
          >
            {conversation.participants.map((participant: any) =>
              participant.user.username === session.user.username
                ? null
                : participant.user.username
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

interface IConversationsWrapperProps {
  session: Session;
}

export default ConversationsWrapper;
