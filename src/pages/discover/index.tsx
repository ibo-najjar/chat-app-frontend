import { useMutation, useQuery } from "@apollo/client";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import UserOperations from "../../graphql/operations/user";
import ConversationOperations from "../../graphql/operations/conversation";
import MessageOperations from "../../graphql/operations/messages";
import { useRouter } from "next/router";
import { ObjectID } from "bson";
import ProfileCard from "@/src/components/discover/ProfileCard";
import { NextPageContext } from "next/types";
import { AiOutlineSearch } from "react-icons/ai";
import toast from "react-hot-toast";
import GroupCard from "../../components/discover/GroupCard";

interface User {
  id: string;
  username: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  bio: string;
}

const Discover = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [message, setMessage] = React.useState<string>("");
  const { data: usersData, loading: usersLoading } = useQuery<any, any>(
    UserOperations.Queries.searchNearUsers,
    {
      variables: {
        latitude: session?.user?.latitude,
        longitude: session?.user?.longitude,
        distance: 100, // 1km
      },
      onCompleted: (data) => {
        console.log("data", data);
      },
    }
  );

  const { data: groupChatsData, error: groupDataError } = useQuery(
    ConversationOperations.Queries.getGroupConversations,
    {
      onCompleted: (data) => {
        // console.log("group conversations", data);
        // toast.success("group conversations");
      },
      onError: (err) => {
        console.log("error", err);
        toast.error("error " + err?.message);
      },
    }
  );

  const [createConversation, { data: convData }] = useMutation<any, any>(
    ConversationOperations.Mutations.createConversation,
    {
      onCompleted: async (data) => {
        console.log("data", data);
        //router.push(`/${data?.createConversation?.id}`);
        const messageId = new ObjectID().toString();
        console.log("message content", message);
        const { data: messageData } = await sendMessage({
          variables: {
            id: messageId,
            senderId: session?.user?.id,
            conversationId: data?.createConversation?.conversationId,
            body: message,
          },
        });
        console.log("messageData", messageData);
      },
    }
  );
  const [sendMessage] = useMutation<any, any>(
    MessageOperations.Mutation.sendMessage,
    {
      onCompleted: (data) => {
        console.log("mosagedata", data);
        router.push({
          query: {
            conversationId: convData?.createConversation?.conversationId,
          },
          pathname: "/",
        });
      },
    }
  );

  return (
    <div className="relative flex justify-center overflow-x-hidden pt-20 max-w-7xl mx-auto h-screen flex-col sm:flex-row">
      <div className="px-3 mb-3 py-4">
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
      <div className="w-full max-w-sm py-4 px-3 space-y-4 flex flex-col items-center mx-auto sm:mx-0">
        {usersData?.searchNearUsers.map((user: User) => {
          return <ProfileCard user={user} key={user.id} />;
        })}
        {groupChatsData?.getGroupConversations.map((group: any) => {
          return <GroupCard group={group} key={group.id} />;
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default Discover;
