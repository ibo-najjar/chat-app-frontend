"use client";

import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { client } from "../graphql/apollo-client";
import { Toaster } from "react-hot-toast";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        {children}
        <Toaster position="bottom-right" />
      </SessionProvider>
    </ApolloProvider>
  );
};

export default Providers;
