const { Schema, model, mongoose  } = require('mongoose');
const bcrypt = require('bcrypt');
  const isPassword = function(password){
    console.log(password)
    const regex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(?)])[\da-zA-Z!@#$%^&*(?)]{6,}$/
    console.log(regex.test(password))
      return regex.test(password);
  }

const userSchema = new Schema({
    //? unique username can be validated on client side
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: isPassword,
            message: "Password must include at least one number, one upcase letter, one lowercase letter, one special character ( !@#$%^&*(?) ) and be at least 6 characters in length. "
        } 
    },
    location:{
        type: String,
        //maxLength: 300
        trim: true
    },
    dogReference:[
        { type: Schema.Types.ObjectId,
            ref: 'Dog'}         
        ],
    // media:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 
    // }]
});

userSchema.pre('remove', async function (next) {
    try {
      // Delete all dogs associated with this user
      await mongoose.model('Dog').deleteMany({ _id: { $in: this.dogs } });
      next();
    } catch (error) {
      next(error);
    }
  });

  userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  userSchema.methods.isCorrectPassword = async function(password) {
    console.log(password)
    console.log( this.password)
    return await bcrypt.compare(password, this.password);
  }; 



const User = model('User', userSchema);

module.exports = User;