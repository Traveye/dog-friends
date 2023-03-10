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



type Dog {
  _id: ID
  name: String
  bio: String
  playStyle: String
  media: [ID!]
  user: ID!
  endorsements: [Endorsement]
}

type Endorsement {
  playStyle: String
  counter: Int
}

type Media {
  _id: ID!
  photo: String!
  banner: Boolean
  dogProfile: Boolean
}

type Query {
  users: [User]
  user(userId: ID!): User
  dogs: [Dog]
  dog(dogId: ID!): Dog
  getDogMedia: [Media]
}

type Mutation {
  addUser(userName: String!, password: String!, location: String!): Auth
  login(userName: String!, password: String!): Auth
  updateUser(id: ID!, userName: String, password: String, location: String, dog: ID): User
  deleteUser(id: ID!, userName: String, password: String, location: String, dog: ID): User
  
  addDog(name: String!, bio: String!, playStyle: String!, media: [ID!], endorsements: [Endorsement]): Dog
  updateDog(dogId: ID!, name: String, bio: String, playStyle: String, media: [ID!], endorsements: [Endorsement]): Dog
  deleteDog(dogId: ID!): Dog
  
  addMedia(id: ID!, photo: String!, banner: Boolean, dogProfile: Boolean): Media

  updateEndorsementCounter(dogId: ID!, playStyle: String!, increment: Int!): Dog
`

module.exports = typeDefs;