import { gql } from "@apollo/client";

//! Queries
// me === getUserByID username/media/all dogs that belong to that user

export const GET_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      username
      dogReference {
        _id
        bio
        breed
        endorsements {
          counter
          playStyle
        }
        media
        name
        playStyle
      }
    }
  }
`;

