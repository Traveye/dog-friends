import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($password: String!, $location: String!, $username: String!) {
  addUser(password: $password, location: $location, username: $username) {
    user {
      username
      password
      location
    }
  }
}
`

export const ADD_DOG = gql`
  mutation addDog($id: ID!, $Name: String, $bio: String, $playStyle: String, $breed: String, $endorsement: Boolean, media: $media) {
    addDog(id: ID!, name: $name, bio: $bio, playStyle: $playStyle, breed: $breed, endorsement: $endorsement, media: $media) {
      _id
      name
      bio
      playStyle
      breed 
      endorsement
      user{
        _id
      }
      media {
    
    }
  }
`
export const ADD_MEDIA = gql`
  mutation updateDog($dogId: ID!, $content: String, $banner: Boolean, $isProfile: Boolean) {
    updateDog(dogId: $dogId, content: $content, isBanner: $isBanner, isProfile: $isProfile ) {
      _id
      content
      isBanner
      isProfile
    
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      token
      profile {
        _id
        userName
      }
    }
  }
`;

export const UPDATE_DOG = gql`
  mutation updateDog($name: name, $bio: bio, $playStyle: playStyle, $breed: breed, $endorsement: endorsement) {
    updateDog(name: $name, bio: $bio, playStyle: $playStyle, breed: $breed, endorsement: $endorsement) {
      _id
      name
      bio
      playStyle
      breed 
      endorsement
      media {
        _id
        content
        isBanner
        isProfile

      }
    }
  }
`
export const UPDATE_MEDIA = gql`
  mutation updateMedia(($dogId: dogId, $content: content, $isBanner: isBanner, $isProfile: isProfile) {
    updateMedia(dogId: $dogId, content: $content, isBanner: $isBanner, isProfile: $isProfile) {
      _id
      content
      isBanner
      isProfile
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($userName: String!, $password: String!, $location: String!) {
    updateUser(userName: $userName, password: $password, location: $location) {
      token{
        _id
        userName
        password
        location
        dog {
          _id
          name
          bio
          playStyle
          breed 
          endorsement
        } 
      }
      
    }
  }
`
export const REMOVE_DOG = gql`
  mutation removeDog($name: String! ) {
    removeDog(name: $name) {
      _id
      name
      bio
      playStyle
      breed 
      endorsement
      media {
        _id
        content
        isBanner
        isProfile

      }
    }
  }
`

export const REMOVE_USER = gql`
  mutation removeUser($userName: String!) {
    removeUser(userName: $userName) {
      token{
        _id
        userName
        password
        location
        dog {
          _id
          name
          bio
          playStyle
          breed 
          endorsement
        } 
    }
  }
`

export const REMOVE_MEDIA = gql`
  mutation removeMedia($content: String!) {
    removeMedia(content: $content) {
      _id
      content
      isBanner
      isProfile
    }
  }
`

