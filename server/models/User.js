const { Schema, model, mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
/*
const isPassword = function (password) {
  regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(?)])[\da-zA-Z!@#$%^&*(?)]{6,}$/
  return regex.test(password)
}
*/
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(?)])[\da-zA-Z!@#$%^&*(?)]{6,}$/, 'Password must include at least one number, one upcase letter, one lowercase letter, one special character ( !@#$%^&*(?) ) and be at least 6 characters in length']
    /*
    validate:{
    validator: isPassword,
    message:"Password must include at least one number, one upcase letter, one lowercase letter, one special character ( !@#$%^&*(?) ) and be at least 6 characters in length." //Please revert if it does not work the same.
    } */
  },
  email: {
      type:String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] //this regex matches an email address with the format "username@domain.extension"
},
  location: {
    type: String,
    trim: true
  },
  dogReference: [{
    type: Schema.Types.ObjectId,
    ref: 'Dog'
  }],
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }],
})

userSchema.pre('remove', async function (next) {
  try {
    // Delete all dogs associated with this user
    await mongoose.model('Dog').deleteMany({ _id: { $in: this.dogs } });
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;
