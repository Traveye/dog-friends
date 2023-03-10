const { User, Dog, Media } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const fetch = require("node-fetch");
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidHJhdmV5ZSIsImEiOiJjbGY2aXRhdmgxbWYwM3FycW53eHVnOW1lIn0.VvfYmU6HQEsz17zN4ly0EA";
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("dogReference");
    },

    user: async (parent, { userId }) => {
      console.log("hitting user resolver");
      return User.findOne({ _id: userId }).populate("dogReference");
    },

    dogs: async () => {
      return Dog.find().populate("userReference").populate("media");
    },

    dog: async (parent, { dogId }) => {
      console.log("resolve, resolve, resolve");
      return Dog.findOne({ _id: dogId })
        .populate("userReference")
        .populate("media")
        .populate("endorsements");
    },
    getDogMedia: async (parent, args, context) => {
      if (context.user) {
        const dog = await Dog.findById(context.dog._id).populate("media");
        return dog.media;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  //? removed doge
  Mutation: {
    addUser: async (parent, { username, password, location }) => {
      const user = await User.create({ username, password, location });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);
      console.log("====", correctPw);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addDog: async (parent, { name, bio, playStyle, breed }, context) => {
      console.log("first");
      if (context.user) {
        console.log(
          `these are variables ${name}, ${bio}, ${playStyle}, ${breed}`
        );

        const dog = await Dog.create({
          name,
          bio,
          playStyle,
          breed,
          userReference: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { dogReference: dog._id } }
        );
        
        const user = await User.findById(context.user._id);

        const userLocation = user.location
        console.log(userLocation)
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation}.json?access_token=${MAPBOX_TOKEN}`
        );
        const data = await response.json();
        const [longitude, latitude] = data.features[0].center;
        console.log("this is our coords " + longitude, latitude)
        dog.location = [longitude, latitude];
        await dog.save();

        return dog;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addMedia: async (parent, { content, dogId }) => {
      console.log(dogId+" word")
      try{
        const dog = await Dog.findById(dogId)
        const media = await Media.create({content})
        console.log(media);
        const updatedDog = await Dog.findByIdAndUpdate(
          dogId,
          { $push: { media: media } },
          { new: true });
          console.log(updatedDog)
        return media;
      } catch(error){
 
        console.error(error)
        
      }
       throw new AuthenticationError("You need to be logged in!");
    },

    updateUser: async (
      parent,
      { id, username, password, location, dogReference },
      context
    ) => {
      console.log("hitting update user resolver");
      if (context.user) {
        if (password) {
          const salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { username, password, location, dogReference },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateDog: async (
      parent,
      { id, name, bio, playStyle, breed, endorsement, media }
    ) => {
      if (context.user) {
        const updatedDog = await Dog.findByIdAndUpdate(
          id,
          { id, name, bio, playStyle, breed, endorsement, media },
          { new: true }
        );
        return updatedDog;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateMedia: async (parent, { id, content, isBanner, isProfile }) => {
      console.log('tryingtoupdatemedia')
      if (context.user.dog) {
        const updatedMedia = await Media.findByIdAndUpdate(
          id,
          { id, content, isBanner, isProfile },
          { new: true }
        );
        return updatedMedia;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteUser: async (parent, { userId }, context) => {
      if (context.user) {
        const user = await User.findOneAndDelete({ _id: userId });
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteDog: async (parent, { dogId }, context) => {
      console.log(context);
      console.log("we in resolvers baby");
      if (context.user) {
        const dog = await Dog.findOneAndDelete({
          _id: dogId,
          // user: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { dogReference: dog._id } }
        );

        return dog;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateEndorsementCounter: async (
      _,
      { dogId, playStyle, increment },
      context
    ) => {
      if (context.user) {
        const update = increment
          ? { $inc: { [`endorsements.${playStyle}`]: 1 } }
          : { $inc: { [`endorsements.${playStyle}`]: -1 } };
        const dog = await Dog.findOneAndUpdate(
          { _id: dogId, user: context.user._id },
          update,
          { new: true }
        );
        if (!dog) throw new UserInputError("Dog not found");
        return dog;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
