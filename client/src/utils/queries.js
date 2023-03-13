import { gql } from "@apollo/client";

//! Queries
// me === getUserByID username/media/all dogs that belong to that user

export const GET_USERS = gql `
query Query {
  users {
    _id
    username
    location
    dogReference {
      _id
      name
      breed
      bio
      playStyle
      endorsements {
        counter
        playStyle
      }
      media
    }
  }
}`

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
query Query($dogId: ID!) {
  dog(dogId: $dogId) {
    _id
    name
    breed
    playStyle
    bio
    endorsements {
      counter
      playStyle
    }
    media
    userReference {
      username
    }
  }
}
`;

//! Queries
// get all dogs by location or all-

export const GET_DOGS = gql`
  query Dogs {
    dogs {
      _id
      bio
      breed
      endorsements {
        counter
        playStyle
      }
      media
      name
    }
  }
`;
