import { gql } from "@apollo/client";

//! Queries
// me === getUserByID username/media/all dogs that belong to that user

export const GET_USERS = gql `
query Query {
  users {
    _id
    location
    password
    dogReference {
      _id
      bio
      breed
      name
      playStyle
      location
      endorsements {
        playStyle
        counter
      }
    }
  }
}`

export const GET_USER = gql`
    query User($userId: ID!) {
      user(userId: $userId) {
        _id
        username
        password
        location
        dogReference {
          name
          breed
          bio
          playStyle
          _id
          media {
            _id
            content
            isBanner
            isProfile
          }
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
    name
    playStyle
    bio
    breed
    _id
    userReference {
      _id
      username
    }
    endorsements {
      counter
      playStyle
    }
    media {
      _id
      content
      isBanner
      isProfile
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
    location
    endorsements {
      counter
      playStyle
    }
    name
    userReference {
      location
    }
    media {
      _id
      content
    }
  }
}
`;
