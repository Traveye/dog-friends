const { Schema, model } = require('mongoose');
const fetch = require('node-fetch');
const MAPBOX_TOKEN = "pk.eyJ1IjoidHJhdmV5ZSIsImEiOiJjbGY2aXRhdmgxbWYwM3FycW53eHVnOW1lIn0.VvfYmU6HQEsz17zN4ly0EA"
//process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const endorsementsSchema = new Schema({
   playStyle:{
      type: String
   },
   counter: Number
})

const dogSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Dog name is required'],
   },
   breed: {
      type: String,
      required: [true, 'Dog breed required']
   },
   bio: {
      type: String,
      required: [true, 'Bio is required'],
   },
   playStyle: {

      type: String,
      required: [true, 'Play style is required'],
   },
   userReference: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }],
   media: [{
      type: Schema.Types.String,
      ref: 'Media'
   }],
   endorsements: [{
      endorsementsSchema
   }]
});


const Dog = model('Dog', dogSchema);

module.exports = Dog;