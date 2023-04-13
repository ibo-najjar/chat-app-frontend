import {
  CreateConversationData,
  CreateConversationInput,
  SearchUsersData,
  SearchUsersInput,
  SearchNearUsersData,
  SearchNearUsersInput,
} from "@/src/util/types";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Session } from "next-auth";
import UserOperations from "../../../graphql/operations/user";
import ConversationOperations from "../../../graphql/operations/conversation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ConversationItem from "./ConversationItem";
import TextSkeleton from "../../Skeleton/TextSkeleton";
import ConversationSkeleton from "../../Skeleton/ConversationSkeleton";
import { AiOutlineSearch } from "react-icons/ai";
import { User } from "@prisma/client";
import CreateConversationModal from "../../Modals/CreateConversationModal";

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
        if (!subscriptionData.data) return prev;

        const newConversation = subscriptionData.data.conversationCreated;

        const returnValue: any = Object.assign({}, prev, {
          getConversations: [...prev.getConversations, newConversation],
        });

        return returnValue;
      },
    });
  };

  useEffect(() => {
    // execute the subscription on mount
    subscribeToNewConversations();
    seacrhUsers({ variables: { username: "" } });
    searchNearUsers({
      variables: {
        latitude: session?.user?.latitude,
        longitude: session?.user?.longitude,
      },
    });
  }, []);

  // User search
  const [seacrhUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);

  const [searchNearUsers, { data: nearData, loading: nearLoading }] =
    useLazyQuery<SearchNearUsersData, SearchNearUsersInput>(
      UserOperations.Queries.searchNearUsers
    );
  //console.log("nearData", nearData, nearLoading);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    seacrhUsers({ variables: { username: value } });
    searchNearUsers({
      variables: {
        latitude: session?.user?.latitude,
        longitude: session?.user?.longitude,
      },
    });
    //console.log(nearData);
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
    router.push({ query: { conversationId }, pathname: "/" });
  };

  if (!convData?.getConversations || convLoading) {
    return (
      <div className="w-full overflow-auto">
        <ConversationSkeleton />
      </div>
    );
  }

  const sorted = convData.getConversations
    .slice()
    .sort((a: any, b: any) => b.updatedAt - a.updatedAt);

  console.log("search", data?.searchUsers);

  return (
    <div className="h-full flex justify-start overflow-x-hidden flex-col">
      <div className="px-3 py-2">
        <label
          htmlFor="search"
          className="flex items-center w-full px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-md focus:outline-none focus:ring-0"
        >
          <AiOutlineSearch className="text-neutral-500 text-md flex-shrink-0" />
          <input
            type="text"
            placeholder="Search"
            className="bg-neutral-900 focus:outline-none focus:ring-0 placeholder-neutral-500 pl-2 w-full"
            id="search"
            autoComplete="off"
          />
        </label>
      </div>
      <div className="overflow-y-auto">
        {sorted.map((conversation: any) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            session={session}
            onConversationClick={onConversationClick}
          />
        ))}
      </div>
      <CreateConversationModal session={session} />
    </div>
  );
};

interface IConversationsWrapperProps {
  session: Session;
}

export default ConversationsWrapper;
