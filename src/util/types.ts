// users

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
    longitude: string;
    latitude: string;
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
