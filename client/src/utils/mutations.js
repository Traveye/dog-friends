import { gql } from '@apollo/client';

//User SignUp
export const ADD_USER = gql`
mutation AddUser($username: String!, $password: String!, $location: String!) {
  addUser(username: $username, password: $password, location: $location) {
    token
    user {
      _id
      username
      password
      location
    }
  }
}
`

//User Add Dog
export const ADD_DOG = gql`
mutation AddDog($name: String!, $bio: String!, $playStyle: String!, $breed: String!) {
  addDog(name: $name, bio: $bio, playStyle: $playStyle, breed: $breed) {
    name
    bio
    playStyle
    breed

  }
}
`
export const ADD_MEDIA = gql`
mutation AddMedia($addMediaId: ID!, $content: String!, $isBanner: Boolean, $isProfile: Boolean) {
  addMedia(id: $addMediaId, content: $content, isBanner: $isBanner, isProfile: $isProfile) {
    _id
    content
    isBanner
    isProfile
  }
}
`

export const LOGIN_USER = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

export const UPDATE_DOG = gql`
mutation UpdateDog($name: String, $dogId: ID!, $bio: String, $playStyle: String, $breed: String, $media: [ID!]) {
  updateDog(name: $name, dogId: $dogId, bio: $bio, playStyle: $playStyle, breed: $breed, media: $media) {
    bio
    breed
    media
    name
    playStyle
  }
}
`
export const UPDATE_MEDIA = gql`
mutation UpdateMedia($updateMediaId: ID!, $content: String, $isBanner: Boolean, $isProfile: Boolean) {
  updateMedia(id: $updateMediaId, content: $content, isBanner: $isBanner, isProfile: $isProfile) {
    _id
    content
    isBanner
    isProfile
  }
}
`

export const UPDATE_USER = gql`
mutation UpdateUser($updateUserId: ID!, $username: String, $password: String, $location: String) {
  updateUser(id: $updateUserId, username: $username, password: $password, location: $location) {
    _id
  }
}
`
export const REMOVE_DOG = gql`
mutation DeleteDog($dogId: ID!) {
  deleteDog(dogId: $dogId) {
    _id
  }
}
`

export const REMOVE_USER = gql`
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    _id
  }
}
`

export const UPDATE_ENDORSEMENT = gql`
mutation Mutation($dogId: ID!, $playStyle: String!, $increment: Int!) {
  updateEndorsementCounter(dogId: $dogId, playStyle: $playStyle, increment: $increment) {
    _id
    name
    endorsements {
      playStyle
      counter
    }
  }
}
`


export const REMOVE_MEDIA = gql`
  mutation removeMedia($content: String!) {
    removeMedia(content: $content) {
    success
    }
  }
`

