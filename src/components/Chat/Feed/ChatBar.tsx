import calculateDistance from "@/src/util/distance";
import { useQuery } from "@apollo/client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { HiLogout } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";
import ConversationOperations from "../../../graphql/operations/conversation";
import Image from "next/image";
import TextSkeleton from "../../Skeleton/TextSkeleton";
interface IChatBarProps {
  session: Session;
  conversationId: string | string[];
  data?: any;
  loading?: boolean;
  error?: any;
}

const ChatBar: React.FC<IChatBarProps> = ({
  conversationId,
  session,
  data,
  loading,
}) => {
  const router = useRouter();

  //console.log("data", data);

  if (loading)
    return (
      <div className=" flex justify-center items-center px-4 w-full space-x-3">
        <TextSkeleton width="32px" height="32px" className="rounded-lg" />
        <TextSkeleton width="40px" height="40px" className="rounded-full" />
        <div className="flex-1 flex flex-col space-y-1">
          <TextSkeleton width="120px" height="15px" className="rounded-xl" />
          <TextSkeleton width="60px" height="13px" className="rounded-xl" />
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center px-4 w-full h-full flex-shrink-0">
      <div className="flex-1 flex items-center space-x-3">
        <button
          onClick={() => {
            // clear query params
            router.push({
              pathname: router.pathname,
              query: {},
            });
          }}
        >
          <IoIosArrowRoundBack className="text-3xl h-8 w-8 bg-secondary rounded-lg hover:bg-neutral-800 transition-all ease-in-out" />
        </button>
        <div className="flex-shrink-0 h-10 w-10">
          <Image
            src={
              data?.conversation?.participants[0]?.user?.imageUrl
                ? data?.conversation?.participants[0]?.user?.imageUrl
                : "/default.png"
            }
            alt="user image"
            width={40}
            height={40}
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
        <div className="flex-1 flex justify-center flex-col">
          <h1 className="leading-6 text-xl max-w-[220px] truncate">
            {data?.conversation?.participants[0]?.user?.username}
          </h1>
          <h1 className="text-xs text-neutral-300 font-normal">
            {calculateDistance(
              parseFloat(data?.conversation?.participants[0]?.user?.latitude),
              parseFloat(data?.conversation?.participants[0]?.user?.longitude),
              session
            ).toFixed(0)}{" "}
            km away
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
