const { Schema, model } = require('mongoose');

const dogSchema = new Schema({
   dog_name: {
      type: String,
      required: [true, 'Dog name is required'],
   },
   bio: {
      type: String,
      required: [true, 'Bio is required'],
   },
   playStyle: {

      type: String,
      required: [true, 'Play style is required'],
   },
   media: [{
      type: Schema.Types.ObjectId,
      ref: 'Media'
   }],
   endorsements: [endorsements]
});

const Dog = model('Dog', dogSchema);

module.exports = Dog;