import { gql } from "@apollo/client";

export default {
  Queries: {
    searchUsers: gql`
      query SearchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          username
          longitude
          latitude
        }
      }
    `,
  },
  Mutations: {
    // ! means mandatory field
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
    setLocation: gql`
      mutation SetLocation($latitude: String!, $longitude: String!) {
        setLocation(latitude: $latitude, longitude: $longitude) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
