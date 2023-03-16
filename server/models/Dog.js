const { Schema, model } = require("mongoose");
const fetch = require("node-fetch");
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidHJhdmV5ZSIsImEiOiJjbGY2aXRhdmgxbWYwM3FycW53eHVnOW1lIn0.VvfYmU6HQEsz17zN4ly0EA";
const User = require("./User");

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
      type: Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
  endorsements: [] 
},
  
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });


// dogSchema.virtual('endorsements'
// {
//   ref: 'Endorsement',
//   localField: '_id',
//   foreignField: 'dog',
//   justOne: false,
//   options: { select: 'playStyle' },
//   count: true,
// }
// ).get(function(){
//   return this.endorsements.length
// }).set(function(data){
//   this.set({counter: data})
// });




const Dog = model("Dog", dogSchema);

module.exports = { Dog, endorsementsSchema };

