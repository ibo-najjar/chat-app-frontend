import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import ConversationOperations from "../../graphql/operations/conversation";

interface Group {
  id: string;
  name: string;
  bio: string;
  latitude: number;
  longitude: number;
  groupRadius: number;
  adminId: string;
  distance: number;
  numberOfParticipants: number;
}

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  console.log("groupId", group.id);

  const [joinGroupConversation, { data, error, loading }] = useMutation(
    ConversationOperations.Mutations.joinGroupConversation,
    {
      variables: {
        conversationId: group.id,
      },
      onCompleted: (data) => {
        console.log("data", data);
        const conversationId = group.id;
        router.push({ query: { conversationId }, pathname: "/" });
      },
      onError: (err) => {
        console.log("error", err);
        toast.error("error " + err?.message);
      },
    }
  );

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `<1km`;
    } else if (distance < 100) {
      return `${distance}km`;
    } else {
      return `>10km`;
    }
  };

  useEffect(() => {
    console.log(isHovered);
  }, [isHovered]);

  return (
    <div
      className="w-full bg-secondary rounded-xl relative h-44 p-3 overflow-hidden group flex-shrink-0"
      key={group.id}
    >
      <div
        className="bg-red-500 w-5/6 h-full rounded-lg flex items-end from-inherit transition-all duration-300 ease-in-out group-hover:grayscale group-hover:w-full"
        style={{
          background: `url(http://localhost:4000/images/${group.id}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <button className="absolute right-[14px] h-10 w-10 bg-purple-800 rounded-full bottom-5 group-hover:scale-[14] group-hover:opacity-50 transition-all duration-300 ease-in-out"></button>
      <Link href={`/`}></Link>
      <h2 className="absolute text-3xl font-extrabold bottom-5 right-20 group-hover:-translate-y-24  transition-all duration-300 ease-in-out">
        {group.name}
      </h2>
      <p className="absolute top-16 w-48 max-h-20 text-xs text-center right-16 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. sdufgisd sdlg h
        dfgiohdfog ghdfoigh
      </p>
      <button
        className="absolute bottom-4 text-lg text-center right-24 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out button py-1"
        onClick={() => joinGroupConversation()}
      >
        Join Group
      </button>
      {liked ? (
        <AiFillHeart
          className="text-3xl cursor-pointer absolute right-4 bottom-16"
          onClick={() => setLiked(!liked)}
          fill="red"
        />
      ) : (
        <AiOutlineHeart
          className="text-3xl cursor-pointer absolute top-0 opacity-0 invisible"
          onClick={() => setLiked(!liked)}
        />
      )}
      <div className="absolute top-5 right-0 w-[68px] space-y-5 group-hover:opacity-0 group-hover:invisible transition-all duration-200 ease-out">
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-lg font-bold leading-4">
            {formatDistance(group.distance)}
          </h4>
          <p className="text-xs text-center text-neutral-400">away</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-lg font-bold leading-4">
            {group.numberOfParticipants}
          </h4>
          <p className="text-xs text-center text-neutral-400">members</p>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
