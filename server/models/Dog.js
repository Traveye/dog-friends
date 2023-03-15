const { Schema, model } = require("mongoose");
const fetch = require("node-fetch");
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidHJhdmV5ZSIsImEiOiJjbGY2aXRhdmgxbWYwM3FycW53eHVnOW1lIn0.VvfYmU6HQEsz17zN4ly0EA";
const User = require("./User");
//process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const endorsementsSchema = new Schema({
  playStyle: {
    type: String,
  },
  counter: Number,
});

const dogSchema = new Schema({
  name: {
    type: String,
    required: [true, "Dog name is required"],
  },
  breed: {
    type: String,
    required: [true, "Dog breed required"],
  },
  bio: {
    type: String,
    required: [true, "Bio is required"],
  },
  playStyle: {
    type: String,
    required: [true, "Play style is required"],
  },
  userReference: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  location: {
    type: [Number], // array of numbers (longitude, latitude)
    index: "2dsphere", // create a geospatial index for location field
  },
  media: [
    {
      type: Schema.Types.Mixed,
      ref: "Media",
    },
  ],
  endorsements: [
    {
      endorsementsSchema,
    },
  ],
});

// dogSchema.post("save", async function (doc, next) {
//   const user = await User.findById(doc.userReference);

//   if (!user.isModified("location")) {
//     console.log(!user.isModified("location"));
//     console.log("location not modified");
//     return next();
//   }
//   try {
//     console.log("hit the try");
//     const response = await fetch(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${user.location}.json?access_token=${MAPBOX_TOKEN}`
//     );
//     const data = await response.json();
//     const [longitude, latitude] = data.features[0].center;

//     doc.location = [longitude, latitude];
//     console.log("location modified: ", doc.location);
//     await doc.save();
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const Dog = model("Dog", dogSchema);

module.exports = Dog;
