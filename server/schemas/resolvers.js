const { User, Dog, Media } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const fetch = require("node-fetch");
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidHJhdmV5ZSIsImEiOiJjbGY2aXRhdmgxbWYwM3FycW53eHVnOW1lIn0.VvfYmU6HQEsz17zN4ly0EA";
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    users: async () => { // Tested
      return User.find().populate("dogReference");
    },
    user: async (__, { userId }) => {
      return User.findOne({ _id: userId }).populate("dogReference");
    },
    // me: async () => {
    // },
    dog: async (__, { dogId }) => { //Tested
      return Dog.findOne({ _id: dogId })
        .populate("userReference")
        .populate("media")
        .populate("endorsements");
    },
    dogs: async () => {
      return Dog.find().populate("userReference").populate("media");
    },
    chats: async (__, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "chats",
          populate: {
            path: "owners",
          },
        });
        return user.chats;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    chat: async (__, { chatId }, context) => { 
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "chats",
          populate: {
            path: "owners",
          },
        });
        const chat = user.chats.find((chat) => chat._id === chatId);
        return chat;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (__, { input } ) => { //tested :)
      console.log(input)
      const user = await User.create(input);
      const token = signToken(user);
      return { token, user };
    },

    login: async (__, { input }) => { //Working
      const { email, password } = input
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },

    addDog: async (__, { input }, context) => { //TESTED
      if (context.user) {
        const dog = await Dog.create(input);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { dogReference: dog._id } }
        );
        const user = await User.findById(context.user._id);

        const userLocation = user.location
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation}.json?access_token=${MAPBOX_TOKEN}`
        );
        const data = await response.json();
        const [longitude, latitude] = data.features[0].center;
        dog.location = [longitude, latitude];
        await dog.save();

        return dog;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addMedia: async (__, { dogId, content }) => {
      const media = await Media.create({ content });
      const dog = await Dog.findByIdAndUpdate(
        dogId,
        { $push: { media: media._id } },
        { new: true }
      );
      return media;
    },

    updateUser: async (
      __,
      { id, username, password, location, dogReference },
      context
    ) => {
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

    updateDog: async (__, { input }) => {
      const { name, bio, playStyle, breed, endorsement, media } = input

      if (context.user) {
        const updatedDog = await Dog.findByIdAndUpdate(
          id,
          { name, bio, playStyle, breed, endorsement, media },
          { new: true }
        );
        return updatedDog;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateMedia: async (__, { id, content, isBanner, isProfile }) => {
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

    deleteUser: async (__, { userId }, context) => {
      if (context.user) {
        const user = await User.findOneAndDelete({ _id: userId });
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteDog: async (__, { dogId }, context) => {
      if (context.user) {
        const dog = await Dog.findOneAndDelete({
          _id: dogId,
          user: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { dogReference: dog._id } }
        );

        return dog;
      }
      throw new AuthenticationError("You need to be logged in!");
    },


    addEndorsement: async (__, { dogId, playStyle, counter }, context) => {
      const { userId } = context;

      // First, check if the user has already endorsed this dog for this play style
      const dog = await Dog.findById(dogId);
      const existingEndorsement = dog.endorsements.find(
        endorsement => endorsement.playStyle === playStyle
      );

      if (existingEndorsement) {
        // If the user has already endorsed this dog for this play style,
        // increment the endorsement counter and save the dog
        existingEndorsement.counter++;
        await dog.save();
      } else {
        // If the user has not endorsed this dog for this play style,
        // create a new endorsement object and push it to the endorsements array
        const newEndorsement = { playStyle, counter: 1 };
        dog.endorsements.push(newEndorsement);
        await dog.save();
      }

      return dog;
    },
    sendChat: async (__, { chatId }, context) => {
      // if (context.user){ //PLEASE ADD ME AFTER TESTING
      const user = await User.findById(context.user._id).populate('chats')
      const chat = user.chats.find((x) => x._id === chatId);
      if (!chat) { throw new Error('Chat not found') }
      //If a chat doesnt exist, throw error but continue doing the workk????
      console.log('walalala guey')
      chat.message.push({
        message: input.message,
        sender: input.user
      })
      await chat.save()
      return console.log('huh')
      // } //CLOSE ME
      // throw new AuthenticationError("You need to be logged in!")
    }

  }
}


module.exports = resolvers;
