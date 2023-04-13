import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserOperations from "../graphql/operations/user";
import getGeoLocation from "../Hooks/getGeoLocation";

interface ILocationProviderProps {
  children: React.ReactNode;
  session: Session;
}

const LocationProvider: React.FC<ILocationProviderProps> = ({
  children,
  session,
}) => {
  return <>{children}</>;
};

export default LocationProvider;
