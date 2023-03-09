const { User, Dog } = require('../models');
// const { AuthenticationError } = require('apollo-server-express');
// const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('dog');
    },

    user: async (parent, {userId}) => {
      return User.findOne({_id: userId}).populate('dog');
    },

    dogs: async (parent, {}) => {
      return Dog.find()
    },

    dog: async (parent, {dogId}) => {
      return Dog.findOne({_id: dogId});
    },
  },
  Mutation: {
    addUser: async (parent, { username, password, location, dog, photos }) => {
      return  User.create({ username, password, location, dog, photos }) ;
    },

    addDog: async (parent, { id, dogName, bio, playStyle, breed, endorsement }) => {
      return  User.create({ id, dogName, bio, playStyle, breed, endorsement }) ;
    },


    updateUser: async (parent, { id, userName, password, location, dog }) => {
      const updatedUser = await User.findByIdAndUpdate(id, { userName, password, location, dog }, { new: true });
      return updatedUser;
    },

    
    updateDog: async (parent, { id, dogName, bio, playStyle, breed, endorsement }) => {
      const updatedDog = await Dog.findByIdAndUpdate(id, { id, dogName, bio, playStyle, breed, endorsement }, { new: true });
      return updatedDog;
    },


    deleteUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    deleteDog: async (parent, { dogId }) => {
      return Dog.findOneAndDelete({ _id: dogId });
    },


  },
 
};

module.exports = resolvers;
