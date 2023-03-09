const { Schema, model } = require('mongoose');

const endorsementsSchema = new Schema({
   play_style:{
      type: String
   },
   counter: Number
})

const dogSchema = new Schema({
   dog_name: {
      type: String,
      required: [true, 'Dog name is required'],
   },
   bio: {
      type: String,
      required: [true, 'Bio is required'],
   },
   play_style: {
      type: String,
      required: [true, 'Play style is required'],
   },
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