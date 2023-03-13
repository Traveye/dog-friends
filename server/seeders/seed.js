const db = require('../config/connection');
const User = require('../models/User');
const Dog = require('../models/Dog');
const Media = require('../models/Media');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const dogData = require('./dogData.json');
const userData = require('./userData.json');
const mediaData = require('./mediaData.json');

db.once('open', async () => {
  await Dog.deleteMany({});
  await User.deleteMany({});
  await Media.deleteMany({});

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = userData.password ? await bcrypt.hash(userData.password, salt) : undefined;
  if (hashedPassword) {
    userData.password = hashedPassword;
  }

  const users = await User.insertMany(hashedPassword);
  const dogs = await Dog.insertMany(dogData);
  const medias = await Media.insertMany(mediaData);

  for (newDog of dogs) {
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.dogReference.push(newDog._id);
    newDog.userReference.push(tempUser._id);
    await tempUser.save();

    const tempMedia = medias[Math.floor(Math.random() * medias.length)];
    newDog.media.push(tempMedia._id);
    await newDog.save();

    tempMedia.dogs.push(newDog._id);
    await tempMedia.save();
  }

  console.log('Got It GUrl!');
  process.exit(0);
});
