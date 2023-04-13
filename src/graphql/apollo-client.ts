import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { getSession } from "next-auth/react";
import { createUploadLink } from "apollo-upload-client";

// const httpLink = new HttpLink({
//   uri: "http://localhost:4000/graphql",
//   credentials: "include",
// });

const useIp = false;
const ipAddress = "http://192.168.1.21:4000/graphql";
const wsAddress = "ws://192.168.1.21:4000/graphql/subscriptions";

const uploadLink = createUploadLink({
  uri: useIp ? ipAddress : "http://localhost:4000/graphql",
  credentials: "include",
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: useIp ? wsAddress : "ws://localhost:4000/graphql/subscriptions",
          connectionParams: async () => ({
            session: await getSession(),
          }),
        })
      )
    : null;

const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        uploadLink // was httpLink
      )
    : uploadLink; // was httpLink

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
