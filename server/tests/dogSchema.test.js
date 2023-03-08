const { gql } = require('apollo-server-express');
const { buildSchema } = require('graphql');

describe('Dog type', () => {
  it('should contain the expected fields', () => {
    const typeDefs = `
    type Dog {
      _id: ID!
      name: String
      bio: String
      playstyle: String
      breed: String
      media: [Media]
    }
    
    type Media {
      _id: ID
      link: String
      profileImage: Boolean
      bannerImage: Boolean
    }`

    const schema = buildSchema(typeDefs);
    const dogFields = schema.getType('Dog').getFields();
    expect(dogFields).toHaveProperty('_id');
    expect(dogFields).toHaveProperty('name');
    expect(dogFields).toHaveProperty('bio');
    expect(dogFields).toHaveProperty('playstyle');
    expect(dogFields).toHaveProperty('breed');
    expect(dogFields).toHaveProperty('media');
  });
});