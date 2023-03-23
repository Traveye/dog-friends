import { gql } from '@apollo/client';

//User SignUp
export const ADD_USER = gql`
mutation AddUser($email: String!, $firstName: String!, $lastName: String!, $password: String!, $location: String!) {
  addUser(email: $email, firstName: $firstName, lastName: $lastName, password: $password, location: $location) {
    user {
      _id
      email
      firstName
      lastName
      password
      location
    }
    token
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
mutation Mutation($content: String!, $dogId: ID) {
  addMedia(content: $content, dogId: $dogId) {
    content
    _id
  }
}
`

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}`

export const UPDATE_DOG = gql`
mutation UpdateDog($name: String, $dogId: ID!, $bio: String, $playStyle: String, $breed: String, $media: ID!) {
  updateDog(name: $name, dogId: $dogId, bio: $bio, playStyle: $playStyle, breed: $breed, media: $media) {
    bio
    breed
    media {
      _id
    }
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
mutation UpdateUser($email: String!, $firstName: String!, $lastName: String!, $password: String, $location: String, $updateUserId: ID!) {
  updateUser(email: $email, firstName: $firstName, lastName: $lastName, password: $password, location: $location, id: $updateUserId) {
    email
    firstName
    lastName
    password
    location
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

