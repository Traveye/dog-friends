
const db = require('../config/connection');
const {User, Dog, Media} = require('../models');
// added Media but don't know how to implement it
const dogData = require('./dogData.json');
const userData = require('./userData.json');
const mediaData = require('./mediaData.json');


db.once('open', async () => {
  await Dog.deleteMany({});
  await User.deleteMany({});
  await Media.deleteMany({});

  const users = await User.insertMany(userData);
  const dogs = await Dog.insertMany(dogData);
  const medias = await Media.insertMany(mediaData);

  for (newDog of dogs) {
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.dogReference.push(newDog._id);
    await tempUser.save();
    
    console.log(tempUser);
    const tempMedia = medias[Math.floor(Math.random() * medias.length)];
    newDog.media.push(tempMedia._id);
    await newDog.save();

    tempMedia.dogs.push(newDog._id);
    await tempMedia.save();
  }

  // // Create dog documents with corresponding media references
  // const dogs = await Dog.create(
  //   dogData.map((dog) => {
  //     const matchingMedias = medias.filter(media => dog.media.includes(media.id));
  //     return {...dog, media: matchingMedias.map(media => media.id)}
  //   })
  // );

  // // Create user documents with corresponding dog references
  // await User.create(
  //   userData.map(user => ({...user, dogs: dogs.filter(dog => user.dogs.includes(dog.id)).map(dog => dog.id)}))
  // );

console.log('Got It GUrl!');
process.exit(0);
});
