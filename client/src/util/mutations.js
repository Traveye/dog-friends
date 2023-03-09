import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($userName: String!, $password: String!, $location: String!) {
    addUser(userName: $userName, password: $password, location: $location) {
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

export const ADD_DOG = gql`
  mutation addDog($id: ID!, $Name: String, $bio: String, $playStyle: String, $breed: String, $endorsement: Boolean) {
    addDog(id: ID!, name: $name, bio: $bio, playStyle: $playstyle, breed: $breed, endorsement: $endorsement) {
      _id
      name
      bio
      playStyle
      breed 
      endorsement
      media {
        _id
        photo
        banner
        dogProfile
        carousel
      }
    }
  }
`
export const ADD_MEDIA = gql`
  mutation updateDog($dogId: ID!, $photo: String, $banner: Boolean, $dogProfile: Boolean, $carousel: Boolean) {
    updateDog(dogId: $dogId, photo: $photo, banner: $banner, dogProfile: $dogProfile, carousel: $carousel) {
      _id
      photo
      banner
      dogProfile
      carousel
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


export const LOGOUT_USER = gql`
  mutation logout($userName: String!, $password: String!) {
    logout(userName: $userName, password: $password) {
      token
      profile {
        _id
        userName
      }
    }
  }
`;

export const UPDATE_DOG = gql`
  mutation updateDog( $name: String, $bio: String, $playStyle: String, $breed: String, $endorsement: Boolean) {
    updateDog(name: $name, bio: $bio, playStyle: $playstyle, breed: $breed, endorsement: $endorsement) {
      _id
      name
      bio
      playStyle
      breed 
      endorsement
      media {
        _id
        photo
        banner
        dogProfile
        carousel
      }
    }
  }
`
export const UPDATE_MEDIA = gql`
  mutation updateMedia($dogId: ID!, $photo: String, $banner: Boolean, $dogProfile: Boolean, $carousel: Boolean) {
    updateMedia(dogId: $dogId, photo: $photo, banner: $banner, dogProfile: $dogProfile, carousel: $carousel) {
      _id
      photo
      banner
      dogProfile
      carousel
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
        photo
        banner
        dogProfile
        carousel
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
  mutation removeMedia($photo: String!) {
    removeMedia(photo: $photo) {
      _id
      photo
      banner
      dogProfile
      carousel
    }
  }
`

