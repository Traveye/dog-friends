import { gql } from "@apollo/client";

//! Queries
// me === getUserByID username/media/all dogs that belong to that user

export const GET_USERS = gql`
query Query {
  users {
    _id
    firstName
    lastName
    location
    email
    dogReference {
      _id
      bio
      breed
      location
      endorsements {
        counter
        playStyle
      }
      media {
        _id
        content
        isProfile
      }
      name
      playStyle
    }
  }
}`

export const GET_USER = gql`
query Query($userId: ID!) {
  user(userId: $userId) {
    _id
    firstName
    lastName
    email
    dogReference {
      _id
      bio
      breed
      endorsements {
        playStyle
        counter
      }
      location
      media {
        _id
      }
      name
      playStyle
    }
    location
    chats {
      _id
      messages {
        message
        sender {
          _id
        }
        timestamp
      }
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
    name
    playStyle
    location
    endorsements {
      playStyle
      counter
    }
    media {
      _id
      content
      isBanner
      isProfile
    }
    userReference {
      _id
      firstName
      lastName
      email
      dogReference {
        _id
      }
    }
  }
}
`;

//! Queries
// get all dogs by location or all-

export const GET_DOGS = gql`
query Query {
  dogs {
    _id
    name
    bio
    breed
    playStyle
    location
    media {
      _id
      content
      isProfile
    }  
  }
}
`;
