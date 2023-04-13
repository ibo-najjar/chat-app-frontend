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
          imageUrl
        }
      }
    `,
    searchNearUsers: gql`
      query SearchNearUsers($latitude: Float!, $longitude: Float!) {
        searchNearUsers(latitude: $latitude, longitude: $longitude) {
          id
          username
          longitude
          latitude
          imageUrl
        }
      }
    `,
    getUser: gql`
      query GetUser($id: String!) {
        getUser(id: $id) {
          username
          bio
          imageUrl
          points
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
    updateUserInformation: gql`
      mutation UpdateUserInformation(
        $username: String
        $bio: String
        $imageUrl: String
      ) {
        updateUserInformation(
          username: $username
          bio: $bio
          imageUrl: $imageUrl
        ) {
          success
          error
        }
      }
    `,
    setLocation: gql`
      mutation SetLocation($latitude: Float!, $longitude: Float!) {
        setLocation(latitude: $latitude, longitude: $longitude) {
          success
          error
        }
      }
    `,
    uploadFile: gql`
      mutation UploadFile($file: Upload!, $fileName: String!) {
        uploadFile(file: $file, fileName: $fileName) {
          url
        }
      }
    `,
  },
  Subscriptions: {},
};
