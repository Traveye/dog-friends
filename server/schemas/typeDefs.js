const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  userName: String!
  password: String!
  location: String!
  dog: [Dog]
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
  addUser(userName: String!, password: String!, location: String!): User
  updateUser(id: ID!, userName: String, password: String, location: String, dog: ID): User
  deleteUser(id: ID!, userName: String, password: String, location: String, dog: ID): User
}
`

module.exports = typeDefs;