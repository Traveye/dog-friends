const { Schema, model } = require('mongoose');

const mediaSchema = new Schema({
   content: {
      type: String,
      required: [true, 'Media content is required'],
   },
   isBanner: {
      type: Boolean,
      default: false
   },
   isProfile: {
      type: Boolean,
      default: false
   },
   dogs:[{
      type: Schema.Types.ObjectId,
      ref:'Dog'
   }]
});

const Media = model('Media', mediaSchema);

module.exports = Media;