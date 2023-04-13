import { gql } from "@apollo/client";

const conversationFields = `
  id
  name
  bio
  groupRadius
  longitude
  latitude
  adminId
  participants {
    user {
      id
      username
      imageUrl
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
    getGroupConversations: gql`
      query GetGroupConversations {
        getGroupConversations {
          id
          name
          bio
          groupRadius
          longitude
          latitude
          adminId
          distance
          numberOfParticipants
        }
      }
    `,
    getConversations: gql`
      query GetConversations {
        getConversations {
          ${conversationFields}
        }
      }
    `,
    conversation: gql`
      query Conversation($conversationId: String!) {
        conversation(conversationId: $conversationId) {
          id
          participants {
            user {
              id
              username
              imageUrl
              longitude
              latitude
            }
          }
        }
      }
    `,
  },
  Mutations: {
    joinGroupConversation: gql`
      mutation JoinGroupConverdation($conversationId: String!) {
        joinGroupConversation(conversationId: $conversationId) {
          conversationId
        }
      }
    `,
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
    createGroupConversation: gql`
      mutation CreateGroupConversation(
        $name: String!
        $adminId: String!
        $bio: String!
        $groupRadius: Int!
        $lng: Float!
        $lat: Float!
      ) {
        createGroupConversation(
          name: $name
          adminId: $adminId
          bio: $bio
          groupRadius: $groupRadius
          lng: $lng
          lat: $lat
        ) {
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
