import { useMutation, useQuery } from "@apollo/client";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import Image from "next/image";

import UserOperations from "../../graphql/operations/user";
import ConversationOperations from "../../graphql/operations/conversation";
import toast from "react-hot-toast";

const User = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { uid } = router.query;

  const [createConversation, { data: convData }] = useMutation<any, any>(
    ConversationOperations.Mutations.createConversation,
    {
      onCompleted: (data) => {
        toast.success("conversation created", data);
        const conversationId = data?.createConversation?.conversationId;
        router.push({ query: { conversationId }, pathname: "/" });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const { data, loading, error } = useQuery(UserOperations.Queries.getUser, {
    variables: {
      id: uid,
    },
  });

  const onCreateConversation = async () => {
    await createConversation({
      variables: {
        participantIds: [session?.user?.id, uid],
      },
    });
  };

  console.log("getUser", data);

  return (
    <div className="flex items-center mx-auto py-3 px-3 max-w-sm flex-col w-full">
      <Image
        src="/banner.gif"
        alt="logo"
        width={100}
        height={100}
        className="rounded-2xl h-44 w-full object-cover absolute max-w-sm"
      />
      <div className="z-20 mt-28 p-1 bg-purple-600 rounded-2xl">
        <Image
          src={data?.getUser?.imageUrl || "/images/default-user.png"}
          alt="Picture of the user"
          width={100}
          height={100}
          className="rounded-xl"
        />
      </div>
      <h1 className="font-extrabold text-3xl mt-3">
        {data?.getUser?.username}
      </h1>
      <p className="text-gray-500 text-sm">{data?.getUser?.bio}</p>
      <button
        className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full mt-3"
        onClick={onCreateConversation}
      >
        start a conversation
      </button>
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

export default User;
