const { gql } = require('apollo-server-express');

const typeDefs = gql`











type Dog {
   _id: ID
   name: String
   bio: String
   playstyle: String
   media: [media]
 }
`

module.exports = typeDefs;