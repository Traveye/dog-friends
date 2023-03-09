const { User, Dog } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
    addUser: async (parent, { username, password, location, dog }) => {
      const user = await User.create({ username, password, location, dog}) 
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { userName, password }) => {
      const user = await User.findOne({ userName });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addDog: async (parent, { id, dogName, bio, playStyle, breed, endorsement, media }, context) => {
      if (context.user) {

        const dog = await Dog.create({
          _id,
          dogName,
          bio,
          playStyle, 
          breed,
          endorsement, 
          media,
          user: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { dogs: dog._id } }
        );

        return dog;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addMedia: async (parent, { id, photo, banner, dogProfile, carousel}, context) => {
      if (context.user) {
        const media = await Media.create({
          id,
          content,
          isBanner,
          isProfile 
       
        });

        await Dog.findOneAndUpdate(
          { _id: context.dog._id },
          { $addToSet: { medias: media._id } }
        );

        return media;
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    updateUser: async (parent, { id, userName, password, location, dog }) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(id, { userName, password, location, dog }, { new: true });
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
 
    
    updateDog: async (parent, { id, dogName, bio, playStyle, breed, endorsement, media }) => {
      if (context.user) {
        const updatedDog = await Dog.findByIdAndUpdate(id, { id, dogName, bio, playStyle, breed, endorsement, media }, { new: true });
        return updatedDog;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateMedia: async (parent, {  id, content, isBanner, isProfile}) => {
      if (context.user.dog) {
        const updatedMedia = await Media.findByIdAndUpdate(id, { id, content, isBanner, isProfile}, { new: true });
        return updatedMedia;
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    deleteUser: async (parent, { userId }, context) => {
      if (context.user) {
        const user = await User.findOneAndDelete({ _id: userId });
        return user;
      }
    throw new AuthenticationError('You need to be logged in!');
    },

    deleteDog: async (parent, { dogId }, context) => {
      if (context.user) {
        const dog = await Dog.findOneAndDelete({
          _id: dogId,
          user: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { dogs: dog._id } }
        );

        return dog;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
 
};


module.exports = resolvers;
