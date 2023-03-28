
const { Schema, model, mongoose } = require('mongoose');
const User = require('./User');

const messageSchema = new Schema({
   recepient: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   message: String,
   timestamp: {
      type: Date,
      default: Date.now
   }
});

const chatSchema = new Schema({
   messages: [messageSchema],
   owners: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
