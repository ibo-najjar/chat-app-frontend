import { Session } from "next-auth";
import React from "react";
import Image from "next/image";

interface IUserCardProps {
  session: Session;
}

const UserCard: React.FC<IUserCardProps> = ({ session }) => {
  return (
    <>
      <div className="flex bg-neutral-900 py-2 px-4 rounded-xl space-x-2 items-center bordered hover:bg-neutral-800 transition-all ease-in-out cursor-pointer">
        <div className="h-10 w-10 relative">
          {session.user.imageUrl && (
            <Image
              src={session?.user?.imageUrl}
              alt="profile image"
              className="rounded-full"
              fill
            />
          )}
        </div>
        <div className="flex-1 flex justify-center flex-col">
          <h3 className="leading-4">{session.user.username}</h3>
          <p className="font-normal text-xs">status: live</p>
        </div>
      </div>
      <div>
        <h1>current location</h1>
        <h3>
          {session.user.latitude} {session.user.longitude}
        </h3>
      </div>
    </>
  );
};

export default UserCard;
