const typeDefs = require('../schemas/typeDefs');
const { buildSchema } = require('graphql')

describe('User type', () => {
   it('should contain the expected fields', () => {
     const schema = buildSchema(typeDefs);
     const userFields = schema.getType('User').getFields();
     expect(userFields).toHaveProperty('_id');
     expect(userFields).toHaveProperty('userName');
     expect(userFields).toHaveProperty('password');
     expect(userFields).toHaveProperty('location');
   });
 });