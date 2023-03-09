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
  name: String
  bio: String
  playstyle: String
  media: [media]
}

type Query {
  user: [User]
  dog: [Dog]
} 

  type Mutation {
  addUser(userName: String!, password: String!, location: String!): Auth
  login(userName: String!, password: String!): Auth
  updateUser(id: ID!, userName: String, password: String, location: String, dog: ID): User
  deleteUser(id: ID!, userName: String, password: String, location: String, dog: ID): User
  logout((userName: String!): Auth
`

module.exports = typeDefs;