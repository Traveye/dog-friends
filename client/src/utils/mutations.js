import { gql } from '@apollo/client';

//User SignUp
export const ADD_USER = gql`
mutation Mutation($input: AddUserInput!) {
  addUser(input: $input) {
    token
    user {
      _id
    }
    token
  }
}
`

//User Add Dog
export const ADD_DOG = gql`
mutation Mutation($input: AddDogInput!) {
  addDog(input: $input) {
    _id
    name
    bio
    breed
    playStyle
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
mutation Mutation($input: loginInput!) {
  login(input: $input) {
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
mutation Mutation($input: AddMediaInput!) {
  addMedia(input: $input) {
    _id
    content
    isBanner
    isProfile
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

export const UPDATE_USER = gql`
mutation Mutation($input: UpdateUserInput!) {
  updateUser(input: $input) {
    _id
  }
}
`
export const REMOVE_DOG = gql`
mutation DeleteDog($input: UpdateDogInput!) {
  deleteDog(input: $input)
}
`

export const REMOVE_USER = gql`
mutation Mutation($input: UpdateUserInput!) {
  deleteUser(input: $input)
}
`


