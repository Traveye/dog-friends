const { User, Dog } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('dog');
    },

    user: async (parent, {userId}) => {
      return User.findOne({_id: userId});
    },

    dogs: async () => {
      return Dog.find()
    },

    dog: async (parent, {dogId}) => {
      return Dog.findOne({_id: dogId});
    },
  },
  Mutation: {
    addUser: async (parent, { username, password, location, dog, media }) => {
      const user = await User.create({ username, password, location, dog, media }) 
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
          id,
          dogName,
          bio,
          playStyle, 
          breed,
          endorsement, 
          media,
          dogHuman: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { dogs: dog._id } }
        );

        return dog;
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    updateUser: async (parent, { id, userName, password, location, dog }) => {
      const updatedUser = await User.findByIdAndUpdate(id, { userName, password, location, dog }, { new: true });
      return updatedUser;
    },

    
    updateDog: async (parent, { id, dogName, bio, playStyle, breed, endorsement }) => {
      if (context.user) {
        const updatedDog = await Dog.findByIdAndUpdate(id, { id, dogName, bio, playStyle, breed, endorsement }, { new: true });
        return updatedDog;
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
          dogHuman: context.user.username,
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
