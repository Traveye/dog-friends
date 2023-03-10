const { Schema, model } = require('mongoose');

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
      type: Schema.Types.ObjectId,
      ref: 'Media'
   }],
   endorsements: [{
      endorsementsSchema
   }]
});

const Dog = model('Dog', dogSchema);

module.exports = Dog;