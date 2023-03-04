const db = require('../config/connection');
const {User, Dog} = require('../models');

const dogData = require('./dogData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await Dog.deleteMany({});
  await User.deleteMany({});

const dogs = await Dog.insertMany(dogData);

for (let i = 0; i < userData.length; i++) {
  const user = new User(userData[i]);
  user.dogs = dogs.filter(dog => userData[i].dogs.includes(dog._id.toString())).map(dog => dog._id);
  await user.save();
}

console.log('Database seeded!');
process.exit(0);
});
