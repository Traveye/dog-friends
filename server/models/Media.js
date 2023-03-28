const { Schema, model, mongoose } = require('mongoose');

const mediaSchema = new Schema({
   content: {
      type: String,   
   },
   isBanner: {
      type: Boolean,
      default: false
   },
   isProfile: {
      type: Boolean,
      default: false
   },
   dog:{
      type: Schema.Types.ObjectId,
      ref:'Dog'
   } // Changed from array to object. only 1 dog owner
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;