const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    password: String!
    location: String!
    dogReference: [Dog]
    chats:[Chat]
  }

  type Chat {
    _id: ID
    owners: [User]
    messages: [Messages] 
  }

  type Messages {
    sender: User
    message: String
    timestamp: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Dog {
    _id: ID!
    name: String!
    breed: String!
    bio: String!
    playStyle: String!
    location: [Float]
    media: [Media]
    endorsements: [Endorsement]
    userReference: [User]
  }

  type Endorsement{
    playStyle: String
    counter: Int
  }

  input loginInput {
    email: String!
    password: String!
  }

  input EndorsementDataInput {
    playStyle: String
    counter: Int
  }

  input AddUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    location: String!
  }

  input UpdateUserInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    location: String
    dogReference: ID
  }

  input UpdateDogInput {
    dogId: ID!
    name: String
    bio: String
    playStyle: String
    breed: String
    media: ID
    endorsements: EndorsementDataInput
  }

  input AddDogInput {
    name: String!
    bio: String!
    playStyle: String!
    breed: String!
  }

  input AddMediaInput {
    content: String!
    dogId: ID
    isBanner: Boolean
    isProfile: Boolean
  }

  input UpdateMediaInput {
    id: ID!
    content: String
    isBanner: Boolean
    isProfile: Boolean
  }

  input AddEndorsementInput {
    dogId: ID!
    playStyle: EndorsementDataInput
  }

  type Media {
    _id: ID
    content: String
    isBanner: Boolean
    isProfile: Boolean
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    dogs: [Dog]
    dog(dogId: ID!): Dog
    getDogMedia: [Media]
    chats: [Chat]
    chat(chatId: ID): Chat
  }
  

  type Mutation {
    login(input: loginInput!): Auth
    addUser(input: AddUserInput!): Auth
    updateUser(input: UpdateUserInput!): User
    deleteUser(input: UpdateUserInput!): User

    addDog(input: AddDogInput!): Dog
    updateDog(input: UpdateDogInput!): Dog
    deleteDog(input: UpdateDogInput!): Dog

    addMedia(input: AddMediaInput!): Media
    updateMedia(input: UpdateMediaInput!): Media

    updateEndorsementCounter(dogId: ID!, playStyle: String!, increment: Int!): Dog
    addEndorsement(input: AddEndorsementInput!): Endorsement

    sendChat(chatId: ID, message: String): String
  }
`;

module.exports = typeDefs;
