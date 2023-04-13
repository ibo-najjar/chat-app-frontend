import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";

interface User {
  id: string;
  username: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  bio: string;
}

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // change to false
  };
  useEffect(() => {
    console.log(isHovered);
  }, [isHovered]);

  return (
    <div
      className="w-full bg-secondary rounded-xl relative h-44 p-3 overflow-hidden group flex-shrink-0"
      key={user.id}
    >
      <div
        className="bg-red-500 w-5/6 h-full rounded-lg flex items-end from-inherit transition-all duration-300 ease-in-out group-hover:grayscale group-hover:w-full"
        style={{
          background: "url(banner.gif)",
          backgroundSize: "cover",
        }}
      ></div>
      <button className="absolute right-[14px] h-10 w-10 bg-purple-800 rounded-full bottom-5 group-hover:scale-[14] group-hover:opacity-50 transition-all duration-300 ease-in-out"></button>
      <Link href={`/user/${user.id}`}>
        <img
          className="absolute right-[16.5px] h-9 w-9 bg-purple-800 rounded-full bottom-[22.5px] cursor-pointer"
          src={user.imageUrl}
        ></img>
      </Link>
      <h2 className="absolute text-3xl font-extrabold bottom-5 right-20 group-hover:-translate-y-24  transition-all duration-300 ease-in-out">
        {user.username}
      </h2>
      <p className="absolute top-16 w-48 max-h-20 text-xs text-center right-16 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. sdufgisd sdlg h
        dfgiohdfog ghdfoigh
      </p>
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
          <h4 className="text-lg font-bold leading-4">2km</h4>
          <p className="text-xs text-center text-neutral-400">away</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h4 className="text-lg font-bold leading-4">30.5k</h4>
          <p className="text-xs text-center text-neutral-400">points</p>
        </div>
      </div>
    </div>
  );
};

// import {}

export default ProfileCard;
