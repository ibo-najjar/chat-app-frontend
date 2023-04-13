import React from "react";
import { TiLocationArrow } from "react-icons/ti";
import { BsChevronDown } from "react-icons/bs";

interface UserLocationProps {}

const UserLocation: React.FC<UserLocationProps> = ({}) => {
  const state = false;
  return (
    <div className="h-full border py-2 px-2 rounded-lg border-neutral-600 flex items-center space-x-1">
      <TiLocationArrow className="text-2xl text-accent" />
      <h1 className="text-sm text-neutral-300 hidden sm:inline">always show</h1>
      <BsChevronDown className="text-md text-neutral-300" />
    </div>
  );
};

export default UserLocation;
