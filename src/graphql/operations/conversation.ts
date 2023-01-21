import { gql } from "@apollo/client";

const conversationFields = `
  id
  participants {
    user {
      id
      username
    }
    hasSeenLatest
  }
  latestMessage {
    id
    sender {
      id
      username
    }
    body
    createdAt
  }
  updatedAt
`;

export default {
  Queries: {
    getConversations: gql`
      query GetConversations {
          getConversations {
              ${conversationFields}
          }
   
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          ${conversationFields}
        }
      }
    `,
  },
};
