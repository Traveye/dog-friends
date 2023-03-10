const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  userName: String!
  password: String!
  location: String!
  dog: [Dog]
}


type Auth {
  token: ID
  user: User
}

type Query {
  user: [User]
  dog: [Dog]
  me: User
}


type Dog {
  _id: ID
  dog_name: String
  bio: String
  play_style: String
  media: [ID!]
  user: ID!
  endorsements: [Endorsement]
}

type Endorsement {
  play_style: String
  counter: Int
}

type Media {
  _id: ID!
  photo: String!
  banner: Boolean
  dogProfile: Boolean
}


  type Mutation {
  addUser(userName: String!, password: String!, location: String!): Auth
  login(userName: String!, password: String!): Auth
  updateUser(id: ID!, userName: String, password: String, location: String, dog: ID): User
  deleteUser(id: ID!, userName: String, password: String, location: String, dog: ID): User

  addDog(dog_name: String!, bio: String!, play_style: String!, media: [ID!], endorsements: [EndorsementInput!]): Dog
  updateDog(dogId: ID!, dog_name: String, bio: String, play_style: String, media: [ID!], endorsements: [EndorsementInput!]): Dog
  deleteDog(dogId: ID!): Dog

  addMedia(id: ID!, photo: String!, banner: Boolean, dogProfile: Boolean): Media

  updateEndorsementCounter(dogId: ID!, playStyle: String!, increment: Int!): Dog
`

module.exports = typeDefs;