// users

import { Prisma } from "@prisma/client";
import { MessagePopulated } from "../../../backend/src/util/types";

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<{
    id: string;
    username: string;
    longitude: number;
    latitude: number;
  }>;
}

export interface SearchNearUsersInput {
  latitude: number;
  longitude: number;
}

export interface SearchNearUsersData {
  searchNearUsers: Array<{
    id: string;
    username: string;
    longitude: number;
    latitude: number;
    imageUrl: string;
  }>;
}

// Conversation

export interface CreateConversationData {
  createConversation: {
    conversationId: any | null;
  };
}

export interface CreateConversationInput {
  participantIds: Array<string>;
}

// Messages

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    };
  };
}
