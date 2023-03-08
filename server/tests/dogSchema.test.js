// const { gql } = require('apollo-server-express');
// const typeDefs = require('../schemas/typeDefs');

// describe('Dog type', () => {
//    it('should contain the expected fields', () => {
//      const schema = buildSchema(typeDefs);
//      const dogFields = schema.getType('Dog').getFields();
//      expect(dogFields).toHaveProperty('_id');
//      expect(dogFields).toHaveProperty('name');
//      expect(dogFields).toHaveProperty('bio');
//      expect(dogFields).toHaveProperty('playstyle');
//    //   expect(dogFields).toHaveProperty('profPhoto');
//    //   expect(dogFields).toHaveProperty('bannerPhoto');
//      expect(dogFields).toHaveProperty('media');
//    });
//  });