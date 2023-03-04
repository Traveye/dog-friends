const { gql } = require('apollo-server-express');
const typeDefs = require('../schemas/typeDefs');

describe('Dog type', () => {
   it('should contain the expected fields', () => {
     const schema = buildSchema(typeDefs);
     const schoolFields = schema.getType('Dog').getFields();
     expect(schoolFields).toHaveProperty('_id');
     expect(schoolFields).toHaveProperty('name');
     expect(schoolFields).toHaveProperty('bio');
     expect(schoolFields).toHaveProperty('playstyle');
     expect(schoolFields).toHaveProperty('profPhoto');
     expect(schoolFields).toHaveProperty('bannerPhoto');
     expect(schoolFields).toHaveProperty('media');
   });
 });