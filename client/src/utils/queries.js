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

//! Queries
//git single dog return all fields
// get single dog the user nd all dogs associated with that dog
export const GET_DOG = gql`
  query Dog($dogId: ID!) {
    dog(dogId: $dogId) {
      _id
      bio
      breed
      endorsements {
        playStyle
        counter
      }
      media
      name
      playStyle
      userReference
    }
  }
`;


