import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider, useMutation } from "@apollo/client";
import { client } from "../graphql/apollo-client";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import LocationProvider from "../lib/LocationProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <LocationProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocationProvider>
        <Toaster />
      </SessionProvider>
    </ApolloProvider>
  );
}
