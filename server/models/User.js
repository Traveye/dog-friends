const { Schema, model } = require('mongoose');
  const isPassword = function(password){
    const regex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
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
        // minLength: 6,
         validate: [isPassword]
    },
    location:{
        type: String,
        //maxLength: 300
        trim: true
    },
    dogReference:[
        { type : Schema.Types.ObjectId,
            ref : 'Dog'}         
        ],
    // media:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 
    // }]
});



const User = model('User', userSchema);

module.exports = User;