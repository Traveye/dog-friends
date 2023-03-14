const db = require("../config/connection");
const User = require("../models/User");
const Dog = require("../models/Dog");
const Media = require("../models/Media");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

const dogData = require("./dogData.json");
const userData = require("./userData.json");
const mediaData = require("./mediaData.json");

db.once("open", async () => {
  await Dog.deleteMany({});
  await User.deleteMany({});
  await Media.deleteMany({});

  // const saltRounds = 10;
  // const salt = await bcrypt.genSalt(saltRounds);
  // const hashedPassword = await bcrypt.hash('Password!123', salt);
  // userData.forEach(user => user.password = hashedPassword);

  const users = await User.insertMany(userData);
  const dogs = await Dog.insertMany(dogData);
  const medias = await Media.insertMany(mediaData);

  for (newDog of dogs) {
    const MAPBOX_TOKEN =
      "pk.eyJ1IjoidHJhdmV5ZSIsImEiOiJjbGY2aXRhdmgxbWYwM3FycW53eHVnOW1lIn0.VvfYmU6HQEsz17zN4ly0EA";

    const tempUser = users[Math.floor(Math.random() * users.length)];

    const userLocation = tempUser.location;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    const [longitude, latitude] = data.features[0].center;
    newDog.location = [longitude, latitude];

    tempUser.dogReference.push(newDog._id);
    newDog.userReference.push(tempUser._id);
    await tempUser.save();

    const tempMedia = medias[Math.floor(Math.random() * medias.length)];
    newDog.media.push(tempMedia._id);
    await newDog.save();

    tempMedia.dogs.push(newDog._id);
    await tempMedia.save();
  }

  console.log("Got It GUrl!");
  process.exit(0);
});
