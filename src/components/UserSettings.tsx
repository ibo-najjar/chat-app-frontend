import { Session } from "next-auth";
import React from "react";
import Image from "next/image";
import TextSkeleton from "./Skeleton/TextSkeleton";
import {
  BsChevronDown,
  BsChevronUp,
  BsGear,
  BsPencil,
  BsArrow90DegLeft,
} from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

interface UserSettingsProps {
  session: Session | null;
}

const UserSettings: React.FC<UserSettingsProps> = ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-neutral-900 py-1.5 px-2 space-x-2 rounded-xl flex items-center border-transparent border hover:border-neutral-700 justify-between">
          <div className="relative flex-shrink-0 h-12 w-12 ">
            {session?.user?.imageUrl ? (
              <>
                <Image
                  src={session?.user?.imageUrl}
                  alt="logo"
                  fill
                  objectFit="cover"
                  className="rounded-lg flex-shrink-0"
                />
                <div className="h-5 w-5 absolute -right-1 -bottom-1 border-4 border-neutral-900 bg-accent rounded-full"></div>
              </>
            ) : (
              <Image
                src={"/default.png"}
                alt="logo"
                height={48}
                width={48}
                className="rounded-lg"
              />
            )}
          </div>
          <div className="sm:flex-1 hidden sm:inline">
            {/*  */}
            {session?.user?.username ? (
              <h1 className="font-semibold text-md truncate leading-5 mt-1 text-left">
                {session?.user?.username}
              </h1>
            ) : (
              <TextSkeleton width="100%" height="27px" className="rounded-lg" />
            )}

            <p className="text-sm font-normal text-left text-neutral-300">
              status: live
            </p>
          </div>
          {true ? (
            <BsChevronUp className="text-neutral-300 text-sm w-4" />
          ) : (
            <BsChevronDown className="text-neutral-300 text-sm w-4" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuItem className="space-x-2 cursor-pointer ">
          <h1>Appear online</h1>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2 cursor-pointer ">
          <BsGear className="mt-0.5" />
          <h1>Settings</h1>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2 cursor-pointer ">
          <BsPencil className="mt-0.5" />
          <h1>Edit Profile</h1>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2 cursor-pointer ">
          <BsArrow90DegLeft className="mt-0.5" />
          <h1>Sign out</h1>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSettings;
