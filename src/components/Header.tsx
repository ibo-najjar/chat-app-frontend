"use client";

import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import getGeoLocation from "../Hooks/getGeoLocation";
import UserOperations from "../graphql/operations/user";
import { BsGlobe2, BsFillChatDotsFill } from "react-icons/bs";
import { FiEdit2, FiLogOut } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import UserSettings from "./UserSettings";
import UserLocation from "./UserLocation";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  const { data: session } = useSession();

  // const coords = getGeoLocation();
  // const [updateUserLocation, { error, loading }] = useMutation(
  //   UserOperations.Mutations.setLocation
  // );

  // useEffect(() => {
  //   if (coords?.error) {
  //     toast.error(coords?.error);
  //   }
  //   if (coords && session?.user && !coords?.error) {
  //     try {
  //       updateUserLocation({
  //         variables: {
  //           latitude: coords.latitude,
  //           longitude: coords.longitude,
  //         },
  //       });
  //     } catch (err: any) {
  //       toast.error("Error updating location ", err?.message);
  //     }
  //   }
  // }, [coords]);
  // console.log("coords", coords);
  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-neutral-900 z-10 top-0 left-0 right-0 h-20 border-b border-neutral-300 dark:border-neutral-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <UserSettings session={session} />
        <UserLocation />
        <div className="flex items-center space-x-3 text-2xl">
          <Link
            href="/"
            className="h-12 w-12 p-3 hover:bg-neutral-900 rounded-xl transition-all ease-in-out duration-150 border-transparent border hover:border-neutral-700"
          >
            <BsFillChatDotsFill className="text-neutral-200" />
          </Link>
          <Link
            href="/discover"
            className="h-12 w-12 p-3 hover:bg-neutral-900 rounded-xl transition-all ease-in-out duration-150 border-transparent border hover:border-neutral-700"
          >
            <BsGlobe2 className="text-neutral-200" />
          </Link>
          <div className="h-8 w-0.5 bg-neutral-800"></div>
          <Link
            href="/settings"
            className="h-12 w-12 p-3 hover:bg-neutral-900 rounded-xl transition-all ease-in-out duration-150 border-transparent border hover:border-neutral-700"
          >
            <IoIosSettings className="text-neutral-200" />
          </Link>
          <Link
            href="/settings"
            className="h-12 w-12 p-3 hover:bg-neutral-900 rounded-xl transition-all ease-in-out duration-150 border-transparent border hover:border-neutral-700 relative"
          >
            <FaBell className="text-neutral-200" />
            <div>
              <div className="h-5 w-5 absolute top-1 right-1 border-[3px] border-neutral-900 bg-accent rounded-full flex items-center justify-center">
                <span className="text-[10px] text-primary font-bold">4</span>
              </div>
            </div>
          </Link>
          {/* vertical divider */}
        </div>
      </div>
    </div>
  );
};

export default Header;
